const router = require("express").Router();
const User = require("../models/User");
const { auth, requireRole } = require("../middleware/auth");

// GET /api/admin/universities
router.get("/universities", auth, requireRole("admin"), async (req, res) => {
    try {
        const universities = await User.find({ role: "university" }).sort({ createdAt: -1 });
        res.json(universities);
    } catch (error) {
        console.log("Fetch universities error:", error);
        res.status(500).json({ message: "Failed to fetch universities" });
    }
});

// PATCH /api/admin/universities/:id/verify
router.patch("/universities/:id/verify", auth, requireRole("admin"), async (req, res) => {
    try {
        const university = await User.findOne({
            _id: req.params.id,
            role: "university",
        });

        if (!university) {
            return res.status(404).json({ message: "University not found" });
        }

        university.isVerified = !university.isVerified;
        await university.save();

        res.json({
            message: `University ${university.isVerified ? "verified" : "unverified"} successfully`,
            university,
        });
    } catch (error) {
        console.log("Toggle verification error:", error);
        res.status(500).json({ message: "Failed to update verification" });
    }
});

// DELETE /api/admin/universities/:id
router.delete("/universities/:id", auth, requireRole("admin"), async (req, res) => {
    try {
        const university = await User.findOneAndDelete({
            _id: req.params.id,
            role: "university",
        });

        if (!university) {
            return res.status(404).json({ message: "University not found" });
        }

        res.json({ message: "University deleted successfully" });
    } catch (error) {
        console.log("Delete university error:", error);
        res.status(500).json({ message: "Failed to delete university" });
    }
});

module.exports = router;