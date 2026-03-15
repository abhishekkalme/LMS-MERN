const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const connectDB = require("./config/db");

const syllabusRoutes = require("./routes/syllabus");
const contactRoutes = require("./routes/contact");
const noteRoutes = require("./routes/noteRoutes");
const aiRoutes = require("./routes/aiRoutes");
const searchRoutes = require("./routes/searchRoutes");

dotenv.config();
// Sanitize production logs: avoid logging actual values.
if (process.env.NODE_ENV !== "production") {
    console.log("Environment Variables Loaded:", process.env.GEMINI_API_KEY ? "GEMINI_API_KEY Found" : "GEMINI_API_KEY NOT FOUND");
}
connectDB();

const app = express();
app.use(helmet());
app.use(express.json({ limit: "5mb" }));

// Diagnostic logging
app.use((req, res, next) => {
  console.log(`📡 [${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const allowedOrigins = [
  "https://lms-learning-management-system.netlify.app",
  "http://localhost:5173",

  process.env.CLIENT_URL,
];


app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ✅ API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/", require("./routes/pdfRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/syllabus", syllabusRoutes);
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/contact", contactRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/planner", require("./routes/plannerRoutes"));
app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api/pyqs", require("./routes/pyqRoutes"));
app.use("/api/activity", require("./routes/activityRoutes"));
app.use("/api/ai", aiRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/stats", require("./routes/statsRoutes"));

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 9000;
console.log(`📡 Attempting to start server on port ${PORT}...`);
app.listen(PORT, () => {
  console.log(`🚀 Server successfully running on http://localhost:${PORT}`);
  
  // Start periodic sync (every 6 hours)
  const { syncAllUsers } = require("./utils/activityEngine");
  setInterval(syncAllUsers, 6 * 60 * 60 * 1000);
  // Optional: Run immediately on startup
  // syncAllUsers();
});
