const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    programId: { type: mongoose.Schema.Types.ObjectId, ref: "Program", required: true, index: true },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

// prevent duplicate apply
applicationSchema.index({ studentId: 1, programId: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);