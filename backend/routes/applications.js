const router = require("express").Router();
const Application = require("../models/Application");
const Program = require("../models/Program");
const User = require("../models/User");
const { auth, requireRole } = require("../middleware/auth");

//  POST /api/applications/:programId (student applies)
router.post("/:programId", auth, requireRole("student"), async (req, res) => {
  try {
    const programId = req.params.programId;

    const program = await Program.findById(programId);
    if (!program) return res.status(404).json({ message: "Program not found" });

    const application = await Application.create({
      studentId: req.user.id,
      programId,
      status: "pending",
    });

    res.status(201).json({ application });
  } catch (error) {
    // handle duplicate apply nicely
    if (error.code === 11000) {
      return res.status(400).json({ message: "You already applied to this program" });
    }
    console.log("Apply error:", error);
    res.status(500).json({ message: "Failed to apply" });
  }
});

//  GET /api/applications/student/list (student: my applications)
router.get("/student/list", auth, requireRole("student"), async (req, res) => {
  try {
    const rawApplications = await Application.find({ studentId: req.user.id })
      .sort({ createdAt: -1 })
      .populate("programId", "title universityName country tuitionTotal scholarshipAmount bannerImageUrl universityLogoUrl affiliation deadline gpaRequired description");

    // nice shape for frontend
    const applications = rawApplications.map((application) => ({
      _id: application._id,
      status: application.status,
      createdAt: application.createdAt,
      programId: application.programId?._id,
      programTitle: application.programId?.title,
      program: application.programId // the fully populated object
    }));

    res.json({ applications });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
});

//  GET /api/applications/university/list (university: applications to my programs)
router.get("/university/list", auth, requireRole("university"), async (req, res) => {
  try {
    const programs = await Program.find({ universityId: req.user.id }).select("_id title");
    const programIds = programs.map((p) => p._id);

    const rawApplications = await Application.find({ programId: { $in: programIds } })
      .sort({ createdAt: -1 })
      .populate("studentId", "name email gpa qualificationLevel")
      .populate("programId", "title universityName");

    const applications = rawApplications.map((application) => ({
      _id: application._id,
      status: application.status,
      createdAt: application.createdAt,
      student: {
        _id: application.studentId?._id,
        name: application.studentId?.name,
        email: application.studentId?.email,
        gpa: application.studentId?.gpa,
        qualificationLevel: application.studentId?.qualificationLevel,
      },
      program: {
        _id: application.programId?._id,
        title: application.programId?.title,
        universityName: application.programId?.universityName,
      },
    }));

    res.json({ applications });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch university applications" });
  }
});

//  PATCH /api/applications/:id (university updates status)
router.patch("/:id", auth, requireRole("university"), async (req, res) => {
  try {
    const { status } = req.body;
    if (!["accepted", "rejected", "pending"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const applicationDocument = await Application.findById(req.params.id);
    if (!applicationDocument) return res.status(404).json({ message: "Application not found" });

    // owner check: application must be for a program belonging to this university
    const program = await Program.findById(applicationDocument.programId);
    if (!program) return res.status(404).json({ message: "Program not found" });

    if (String(program.universityId) !== String(req.user.id))
      return res.status(403).json({ message: "Not your application" });

    applicationDocument.status = status;
    await applicationDocument.save();

    res.json({ application: applicationDocument });
  } catch (error) {
    res.status(500).json({ message: "Failed to update application" });
  }
});

module.exports = router;