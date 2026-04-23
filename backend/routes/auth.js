const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function signToken(user) {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      name: user.name,
      isVerified: user.isVerified,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, gpa, qualificationLevel, budget, preferredLocation, preferredCourse } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "name, email, password, role are required",
      });
    }

    if (!["student", "university", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const userPayload = {
      name: String(name).trim(),
      email: normalizedEmail,
      password: hashed,
      role,
      isVerified: role === "university" ? false : true,
    };

    if (role === "student") {
      if (gpa !== undefined && gpa !== "") {
        userPayload.gpa = Number(gpa);
      }
      if (qualificationLevel !== undefined && qualificationLevel !== "") {
        userPayload.qualificationLevel = String(qualificationLevel).trim();
      }
      if (budget !== undefined && budget !== "") {
        userPayload.budget = Number(budget);
      }
      if (preferredLocation !== undefined && preferredLocation !== "") {
        userPayload.preferredLocation = String(preferredLocation).trim();
      }
      if (preferredCourse !== undefined && preferredCourse !== "") {
        userPayload.preferredCourse = String(preferredCourse).trim();
      }
    }

    const user = await User.create(userPayload);

    const token = signToken(user);

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.log("Register error:", error);
    res.status(500).json({ message: "Register failed" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required",
      });
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = signToken(user);

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;