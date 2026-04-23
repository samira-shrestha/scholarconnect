const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    //  display on student card
    universityName: { type: String, required: true, trim: true },

    //  images for card
    universityLogoUrl: { type: String, default: "" },   // small logo
    bannerImageUrl: { type: String, default: "" },      // big banner

    //  offer title / label
    title: { type: String, required: true, trim: true },

    //  money fields (not percentage)
    tuitionTotal: { type: Number, default: 0 },         // e.g. 60000
    scholarshipAmount: { type: Number, default: 0 },    // Legacy field, keep for safety
    scholarshipPercentage: { type: String, default: "0" }, // e.g. "50" or "20-80"
    scholarshipType: { type: String, enum: ["Merit-based", "Need-based", "Entrance-based"], default: "Merit-based" },
    eligibilityCriteria: { type: String, default: "" },

    // optional helpers
    country: { type: String, default: "", trim: true },
    deadline: { type: Date, default: null },

    // optional card extras
    qsRankText: { type: String, default: "" },          // "Ranked #3 Worldwide"
    awardedOn: { type: Date, default: null },           // optional, usually after approval

    description: { type: String, default: "" },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Program", programSchema);