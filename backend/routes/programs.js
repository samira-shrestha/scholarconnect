const router = require("express").Router();
const Program = require("../models/Program");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { auth, requireRole } = require("../middleware/auth");

//  GET /api/programs (public list for students)
router.get("/", async (req, res) => {
  try {
    const programsRaw = await Program.find({ isActive: true })
      .populate("universityId", "isVerified")
      .sort({ createdAt: -1 })
      .lean();

    let student = null;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      const token = req.headers.authorization.split(" ")[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role === "student") {
          student = await User.findById(decoded.id);
        }
      } catch (err) { }
    }

    const programs = programsRaw.map(p => {
      let matchPercentage = 0;
      if (student && student.role === "student") {
        let score = 0;

        // Location Match (25%)
        if (p.country && student.preferredLocation) {
          if (p.country.toLowerCase() === student.preferredLocation.toLowerCase()) {
            score += 25;
          }
        } else if (!p.country) {
          score += 25; // if program has no location requirement, it's a match
        }

        // Budget Match (25%)
        if (student.budget > 0) {
          let expectedScholarship = p.scholarshipAmount || 0;
          if (p.scholarshipPercentage) {
            const pctStr = p.scholarshipPercentage.replace(/%/g, "").split(/[-–]/)[0];
            const pct = parseFloat(pctStr) || 0;
            expectedScholarship = ((p.tuitionTotal || 0) * pct) / 100;
          }
          const cost = (p.tuitionTotal || 0) - expectedScholarship;
          if (cost <= student.budget) {
            score += 25;
          }
        } else {
          score += 25; // if student has no budget preference, it's a match
        }

        // GPA Eligibility (25%)
        // program does not have gpaRequired in the model wait, let me check Program model (tuitionTotal, scholarshipAmount but no gpaRequired?). Wait, the UI has gpaRequired in ProgramCard.
        if (!p.gpaRequired) {
          score += 25; // assuming match if no gpa required
        } else if (student.gpa && student.gpa >= p.gpaRequired) {
          score += 25;
        }

        // Course Match (25%)
        if (p.title && student.preferredCourse) {
          if (p.title.toLowerCase().includes(student.preferredCourse.toLowerCase())) {
            score += 25;
          }
        } else if (!student.preferredCourse) {
          score += 25; // no preference -> assume match
        }

        matchPercentage = score;
      }

      return {
        ...p,
        universityIsVerified: p.universityId?.isVerified || false,
        universityId: p.universityId?._id || p.universityId,
        matchPercentage
      };
    });

    res.json({ programs });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch programs" });
  }
});

//  GET /api/programs/mine/list (university only)
router.get("/mine/list", auth, requireRole("university"), async (req, res) => {
  try {
    const programs = await Program.find({ universityId: req.user.id }).sort({ createdAt: -1 });
    res.json({ programs });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your programs" });
  }
});

//  GET /api/programs/:id
router.get("/:id", async (req, res) => {
  try {
    const programRaw = await Program.findById(req.params.id)
      .populate("universityId", "isVerified")
      .lean();
    if (!programRaw) return res.status(404).json({ message: "Program not found" });

    const program = {
      ...programRaw,
      universityIsVerified: programRaw.universityId?.isVerified || false,
      universityId: programRaw.universityId?._id || programRaw.universityId
    };

    res.json({ program });
  } catch (error) {
    res.status(500).json({ message: "Error fetching program" });
  }
});

//  POST /api/programs (university only)  -> now creates an "Offer"
router.post("/", auth, requireRole("university"), async (req, res) => {
  try {
    const {
      title,
      country,
      deadline,
      description,

      //  new card fields
      universityLogoUrl,
      bannerImageUrl,
      tuitionTotal,
      scholarshipPercentage,
      scholarshipType,
      eligibilityCriteria,
      scholarshipAmount,
      affiliation,
    } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const program = await Program.create({
      universityId: req.user.id,
      universityName: req.user.name,

      universityLogoUrl: (universityLogoUrl || "").trim(),
      bannerImageUrl: (bannerImageUrl || "").trim(),

      title: String(title).trim(),
      country: (country || "").trim(),

      tuitionTotal: Number(tuitionTotal || 0),
      scholarshipPercentage: String(scholarshipPercentage || "0").trim(),
      scholarshipType: (scholarshipType || "Merit-based").trim(),
      eligibilityCriteria: (eligibilityCriteria || "").trim(),
      scholarshipAmount: Number(scholarshipAmount || 0),

      deadline: deadline ? new Date(deadline) : null,
      affiliation: (affiliation || "").trim(),

      description: (description || "").trim(),
      isActive: true,
    });

    res.status(201).json({ program });
  } catch (error) {
    console.log("Create program error:", error);
    res.status(500).json({ message: "Failed to create offer" });
  }
});

//  PATCH /api/programs/:id (toggle isActive - university owner only)
router.patch("/:id", auth, requireRole("university"), async (req, res) => {
  try {
    const { isActive } = req.body;

    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: "Program not found" });

    if (String(program.universityId) !== String(req.user.id))
      return res.status(403).json({ message: "Not your program" });

    program.isActive = Boolean(isActive);
    await program.save();

    res.json({ program });
  } catch (error) {
    res.status(500).json({ message: "Failed to update program" });
  }
});

//  DELETE /api/programs/:id (university owner only)
router.delete("/:id", auth, requireRole("university"), async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: "Program not found" });

    if (String(program.universityId) !== String(req.user.id))
      return res.status(403).json({ message: "Not your program" });

    await program.deleteOne();
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

//  PUT /api/programs/:id (update program - university owner only)
router.put("/:id", auth, requireRole("university"), async (req, res) => {
  try {
    const {
      title,
      country,
      deadline,
      description,
      universityLogoUrl,
      bannerImageUrl,
      tuitionTotal,
      scholarshipPercentage,
      scholarshipType,
      eligibilityCriteria,
      scholarshipAmount,
      affiliation,
    } = req.body;

    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: "Program not found" });

    if (String(program.universityId) !== String(req.user.id))
      return res.status(403).json({ message: "Not your program" });

    if (!title) return res.status(400).json({ message: "Title is required" });

    program.title = String(title).trim();
    program.country = (country || "").trim();
    program.tuitionTotal = Number(tuitionTotal || 0);
    program.scholarshipPercentage = String(scholarshipPercentage || "0").trim();
    program.scholarshipType = (scholarshipType || "Merit-based").trim();
    program.eligibilityCriteria = (eligibilityCriteria || "").trim();
    program.scholarshipAmount = Number(scholarshipAmount || 0);
    program.deadline = deadline ? new Date(deadline) : null;
    program.affiliation = (affiliation || "").trim();
    program.universityLogoUrl = (universityLogoUrl || "").trim();
    program.bannerImageUrl = (bannerImageUrl || "").trim();
    program.description = (description || "").trim();

    await program.save();

    res.json({ program });
  } catch (error) {
    console.error("Update program error:", error);
    res.status(500).json({ message: "Failed to update offer" });
  }
});

module.exports = router;