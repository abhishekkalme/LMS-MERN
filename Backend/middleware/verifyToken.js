
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "dev-fallback-secret-change-in-production";

const verifyToken = (req, res, next) => {
  if (!JWT_SECRET || JWT_SECRET === "dev-fallback-secret-change-in-production") {
    console.warn("⚠️ WARNING: Using default JWT_SECRET. Set JWT_SECRET env var for production!");
  }

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== "admin") return res.status(403).json({ error: "Not authorized" });
    next();
  });
};



module.exports = { verifyToken, verifyAdmin };
