const router = require("express").Router();
const Program = require("../models/Program");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { auth, requireRole } = require("../middleware/auth");

//  GET /api/programs (public list for students)
router.get("/", async (req, res) => {
  try {
    const programsRaw = await Program.find({ isActive: true })
      .populate("collegeId", "isVerified")
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

        // Locations Match (25%)
        if (p.country && student.preferredLocations) {
          if (p.country.toLowerCase() === student.preferredLocations.toLowerCase()) {
            score += 25;
          }
        } else if (!p.country) {
          score += 25; // if program has no Locations requirement, it's a match
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
        collegeIsVerified: p.collegeId?.isVerified || false,
        collegeId: p.collegeId?._id || p.collegeId,
        matchPercentage
      };
    });

    res.json({ programs });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch programs" });
  }
});

//  GET /api/programs/mine/list (college only)
router.get("/mine/list", auth, requireRole("college"), async (req, res) => {
  try {
    const programs = await Program.find({ collegeId: req.user.id }).sort({ createdAt: -1 });
    res.json({ programs });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your programs" });
  }
});

//  GET /api/programs/:id
router.get("/:id", async (req, res) => {
  try {
    const programRaw = await Program.findById(req.params.id)
      .populate("collegeId", "isVerified")
      .lean();
    if (!programRaw) return res.status(404).json({ message: "Program not found" });

    const program = {
      ...programRaw,
      collegeIsVerified: programRaw.collegeId?.isVerified || false,
      collegeId: programRaw.collegeId?._id || programRaw.collegeId
    };

    res.json({ program });
  } catch (error) {
    res.status(500).json({ message: "Error fetching program" });
  }
});

//  POST /api/programs (college only)  -> now creates an "Offer"
router.post("/", auth, requireRole("college"), async (req, res) => {
  try {
    const {
      title,
      country,
      deadline,
      description,

      //  new card fields
      collegeLogoUrl,
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
      collegeId: req.user.id,
      collegeName: req.user.name,

      collegeLogoUrl: (collegeLogoUrl || "").trim(),
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

//  PATCH /api/programs/:id (toggle isActive - college owner only)
router.patch("/:id", auth, requireRole("college"), async (req, res) => {
  try {
    const { isActive } = req.body;

    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: "Program not found" });

    if (String(program.collegeId) !== String(req.user.id))
      return res.status(403).json({ message: "Not your program" });

    program.isActive = Boolean(isActive);
    await program.save();

    res.json({ program });
  } catch (error) {
    res.status(500).json({ message: "Failed to update program" });
  }
});

//  DELETE /api/programs/:id (college owner only)
router.delete("/:id", auth, requireRole("college"), async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: "Program not found" });

    if (String(program.collegeId) !== String(req.user.id))
      return res.status(403).json({ message: "Not your program" });

    await program.deleteOne();
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

//  PUT /api/programs/:id (update program - college owner only)
router.put("/:id", auth, requireRole("college"), async (req, res) => {
  try {
    const {
      title,
      country,
      deadline,
      description,
      collegeLogoUrl,
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

    if (String(program.collegeId) !== String(req.user.id))
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
    program.collegeLogoUrl = (collegeLogoUrl || "").trim();
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