const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/User");
const sendEmail = require("../config/sendEmail");

function signToken(user) {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      name: user.name,
      isVerified: user.isVerified,
      emailVerified: user.emailVerified,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      gpa,
      qualificationLevel,
      budget,
      preferredLocations,
      preferredCourse,
    } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "name, email, password, role are required",
      });
    }

    if (!["student", "college", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const emailVerificationToken = crypto.randomBytes(32).toString("hex");

    const userPayload = {
      name: String(name).trim(),
      email: normalizedEmail,
      password: hashed,
      role,

      // keep this for your existing college/admin approval logic
      isVerified: true,

      // new email verification field
      emailVerified: role === "college" ? true : false,
      emailVerificationToken: role === "college" ? undefined : emailVerificationToken,
      emailVerificationTokenExpires: role === "college" ? undefined : Date.now() + 60 * 60 * 1000,
    };

    if (role === "student") {
      if (gpa !== undefined && gpa !== "") userPayload.gpa = Number(gpa);
      if (qualificationLevel !== undefined && qualificationLevel !== "") {
        userPayload.qualificationLevel = String(qualificationLevel).trim();
      }
      if (budget !== undefined && budget !== "") userPayload.budget = Number(budget);
      if (preferredLocations !== undefined && preferredLocations !== "") {
        userPayload.preferredLocations = String(preferredLocations).trim();
      }
      if (preferredCourse !== undefined && preferredCourse !== "") {
        userPayload.preferredCourse = String(preferredCourse).trim();
      }
    }

    const user = await User.create(userPayload);

    const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
    const verificationLink = `${clientOrigin}/verify-email/${emailVerificationToken}`;

    if (role === "student") {
      await sendEmail({
        to: user.email,
        subject: "Verify your ScholarConnect email",
        html: `
          <h2>Welcome to ScholarConnect</h2>
          <p>Hello ${user.name},</p>
          <p>Please verify your email address to activate your account.</p>
          <a href="${verificationLink}">Verify Email</a>
           
        `,
      });
    }

    res.status(201).json({
      message: "Registration successful. Please check your email to verify your account.",
    });
  } catch (error) {
    console.log("Register error:", error);
    res.status(500).json({ message: "Register failed", error: error.message });
  }
});

// GET /api/auth/verify-email/:token
router.get("/verify-email/:token", async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification link",
      });
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpires = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Email verified successfully. You can now login.",
    });
  } catch (error) {
    console.log("Verify email error:", error);
    res.status(500).json({
      success: false,
      message: "Email verification failed",
    });
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

    if (user.role === "student" && !user.emailVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in.",
      });
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
        emailVerified: user.emailVerified,
      },
    });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;