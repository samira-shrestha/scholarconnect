const router = require("express").Router();
const Program = require("../models/Program");
const { auth, requireRole } = require("../middleware/auth");

//  GET /api/programs (public list for students)
router.get("/", async (req, res) => {
  try {
    const programs = await Program.find({ isActive: true }).sort({ createdAt: -1 });
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
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: "Program not found" });
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
      scholarshipAmount,
      qsRankText,
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
      scholarshipAmount: Number(scholarshipAmount || 0),

      deadline: deadline ? new Date(deadline) : null,
      qsRankText: (qsRankText || "").trim(),

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
      scholarshipAmount,
      qsRankText,
    } = req.body;

    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: "Program not found" });

    if (String(program.universityId) !== String(req.user.id))
      return res.status(403).json({ message: "Not your program" });

    if (!title) return res.status(400).json({ message: "Title is required" });

    program.title = String(title).trim();
    program.country = (country || "").trim();
    program.tuitionTotal = Number(tuitionTotal || 0);
    program.scholarshipAmount = Number(scholarshipAmount || 0);
    program.deadline = deadline ? new Date(deadline) : null;
    program.qsRankText = (qsRankText || "").trim();
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