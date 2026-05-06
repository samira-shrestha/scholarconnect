const router = require("express").Router();
const Program = require("../models/Program");
const Application = require("../models/Application");
const { auth, requireRole } = require("../middleware/auth");

router.get("/", auth, requireRole("college"), async (req, res) => {
    try {
        const collegeId = req.user.id;

        // Count total programs of this college
        const totalPrograms = await Program.countDocuments({ collegeId });

        // Get all program ids of this college
        const programs = await Program.find({ collegeId }).select("_id");
        const programIds = programs.map((p) => p._id);

        // Count applications for those programs
        const applications = await Application.countDocuments({
            programId: { $in: programIds },
        });

        const accepted = await Application.countDocuments({
            programId: { $in: programIds },
            status: "accepted",
        });

        const pending = await Application.countDocuments({
            programId: { $in: programIds },
            status: "pending",
        });

        res.json({
            totalPrograms,
            applications,
            accepted,
            pending,
        });
    } catch (error) {
        console.log("college dashboard error:", error);
        res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
});

module.exports = router;