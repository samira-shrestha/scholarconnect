const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded contains: id, role, name
    req.user = { id: decoded.id, role: decoded.role, name: decoded.name };

    next();
  } catch (error) {
    console.log("Auth middleware error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!roles.includes(req.user.role)) {
      console.log(`Role check failed: user role="${req.user.role}", required="${roles.join(",")}", path=${req.originalUrl}`);
      return res.status(403).json({
        message: `Forbidden: requires ${roles.join(" or ")} role, but you are logged in as ${req.user.role}`,
      });
    }
    next();
  };
}

module.exports = { auth, requireRole };