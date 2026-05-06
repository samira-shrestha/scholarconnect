require("dotenv").config();
const mongoose = require("mongoose");

async function migrate() {
  try {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/scholarconnect";
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB.");

    const db = mongoose.connection.db;

    // Fix Users collection: change role 'university' to 'college'
    const usersColl = db.collection("users");
    const userResult = await usersColl.updateMany(
      { role: "university" },
      { $set: { role: "college" } }
    );
    console.log(`Users updated: ${userResult.modifiedCount}`);

    // Fix Programs collection: rename fields if they exist
    const programsColl = db.collection("programs");
    const programResult = await programsColl.updateMany(
      {},
      { 
        $rename: { 
          "universityId": "collegeId",
          "universityName": "collegeName",
          "universityLogoUrl": "collegeLogoUrl"
        } 
      }
    );
    console.log(`Programs schema fields updated: ${programResult.modifiedCount}`);

    console.log("Migration complete.");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

migrate();
