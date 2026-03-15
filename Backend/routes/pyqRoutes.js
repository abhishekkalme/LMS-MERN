const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const PYQ = require("../models/PYQ");
const { verifyAdmin } = require("../middleware/verifyToken");

const router = express.Router();

// Middleware: Extract metadata from query
const extractMetadata = (req, res, next) => {
  const { branch, year, semester, subject, examSession } = req.query;

  if (!branch || !year || !semester || !subject || !examSession) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  req.customMeta = { branch, year, semester, subject, examSession };
  next();
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const { branch, year, semester, subject, examSession } = req.customMeta || {};
    const clean = (str) => str.trim().replace(/\s+/g, "_");

    return {
      folder: `jit_learning_notes/PYQ/${clean(branch)}/${clean(year)}/${clean(semester)}/${clean(subject)}`,
      public_id: `PYQ-${clean(subject)}-${clean(examSession)}-${Date.now()}`,
      format: "pdf",
      resource_type: "raw",
    };
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15 MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'));
    }
    cb(null, true);
  }
});

// @route   POST /api/pyqs/upload
// @desc    Upload a PYQ PDF
router.post("/upload", verifyAdmin, extractMetadata, upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const { branch, year, semester, subject, examSession } = req.customMeta;
    const newPYQ = new PYQ({
      branch, year, semester, subject, examSession,
      fileUrl: req.file.path,
      filename: req.file.filename,
    });

    await newPYQ.save();
    res.status(201).json({ message: "PYQ uploaded successfully", pyq: newPYQ });
  } catch (err) {
    console.error("PYQ Upload Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// @route   GET /api/pyqs/search
// @desc    Search PYQs by branch, year, semester, subject
router.get("/search", async (req, res) => {
  try {
    const { branch, year, semester, subject } = req.query;
    let query = {};
    if (branch) query.branch = branch;
    if (year) query.year = year;
    if (semester) query.semester = semester;
    if (subject) query.subject = subject;

    const pyqs = await PYQ.find(query).sort({ examSession: -1 });
    res.json(pyqs);
  } catch (err) {
    console.error("PYQ Search Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// @route   DELETE /api/pyqs/:id
// @desc    Delete a PYQ record
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const pyq = await PYQ.findById(req.params.id);
    if (!pyq) return res.status(404).json({ error: "PYQ not found" });

    await PYQ.findByIdAndDelete(req.params.id);
    res.json({ message: "PYQ record deleted" });
  } catch (err) {
    console.error("PYQ Delete Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
