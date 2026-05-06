const router = require("express").Router();
const User = require("../models/User");
const { auth, requireRole } = require("../middleware/auth");

// GET /api/admin/college
router.get("/college", auth, requireRole("admin"), async (req, res) => {
    try {
        const college = await User.find({ role: "college" }).sort({ createdAt: -1 });
        res.json(college);
    } catch (error) {
        console.log("Fetch college error:", error);
        res.status(500).json({ message: "Failed to fetch college" });
    }
});

// PATCH /api/admin/college/:id/verify
router.patch("/college/:id/verify", auth, requireRole("admin"), async (req, res) => {
    try {
        const college = await User.findOne({
            _id: req.params.id,
            role: "college",
        });

        if (!college) {
            return res.status(404).json({ message: "college not found" });
        }

        college.isVerified = !college.isVerified;
        await college.save();

        res.json({
            message: `college ${college.isVerified ? "verified" : "unverified"} successfully`,
            college,
        });
    } catch (error) {
        console.log("Toggle verification error:", error);
        res.status(500).json({ message: "Failed to update verification" });
    }
});

// DELETE /api/admin/college/:id
router.delete("/college/:id", auth, requireRole("admin"), async (req, res) => {
    try {
        const college = await User.findOneAndDelete({
            _id: req.params.id,
            role: "college",
        });

        if (!college) {
            return res.status(404).json({ message: "college not found" });
        }

        res.json({ message: "college deleted successfully" });
    } catch (error) {
        console.log("Delete college error:", error);
        res.status(500).json({ message: "Failed to delete college" });
    }
});

module.exports = router;