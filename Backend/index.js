const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const syllabusRoutes = require("./routes/syllabus");
const contactRoutes = require("./routes/contact");
const noteRoutes = require("./routes/noteRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

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

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
