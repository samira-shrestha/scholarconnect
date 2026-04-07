const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const programRoutes = require("./routes/programs");
const applicationRoutes = require("./routes/applications");
const universityDashboardRoutes = require("./routes/universityDashboard");
const adminRoutes = require("./routes/admin");
const app = express();

//  CORS should be before json()
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,   // set this to http://localhost:5173
  "http://localhost:5173",
  "http://localhost:5174",
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

//  preflight (uses SAME config automatically via app.use(cors(...)))
app.use(express.json());

app.get("/", (req, res) => res.send("ScholarConnect API running "));
app.get("/api/ping", (req, res) =>
  res.json({ ok: true, origin: req.headers.origin || null })
);

app.use("/api/auth", authRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/university/dashboard", universityDashboardRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5050;

connectDB().then(() => {
  app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
});