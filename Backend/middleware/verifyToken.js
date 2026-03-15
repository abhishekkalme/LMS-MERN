
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("FATAL: JWT_SECRET environment variable is not set.");
  process.exit(1);
}

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  // console.log("Authorization Header:", req.headers.authorization);

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
