const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "university", "admin"], required: true },
    isVerified: { type: Boolean, default: false },
    gpa: { type: Number },
    qualificationLevel: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);