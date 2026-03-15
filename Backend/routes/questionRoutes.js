const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const ImportantQuestion = require("../models/ImportantQuestion");

const router = express.Router();

// Middleware: Extract metadata
const extractMetadata = (req, res, next) => {
  const { branch, year, semester, subject, unit } = req.query;

  if (!branch || !year || !semester || !subject || !unit) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  req.customMeta = { branch, year, semester, subject, unit };
  next();
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const { branch, year, semester, subject, unit } = req.customMeta || {};
    const clean = (str) => str.trim().replace(/\s+/g, "_");
    const unitNumberOnly = unit.replace(/\D/g, "");

    return {
      folder: `jit_learning_notes/ImportantQuestions/${clean(branch)}/${clean(year)}/${clean(semester)}/${clean(subject)}/Unit_${unitNumberOnly}`,
      public_id: `IQ-${clean(subject)}-unit-${unitNumberOnly}-${Date.now()}`,
      format: "pdf",
      resource_type: "raw",
    };
  },
});

const upload = multer({ storage });

// @route   POST /api/questions/upload
// @desc    Upload an Important Question PDF
router.post("/upload", extractMetadata, upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const { branch, year, semester, subject, unit } = req.customMeta;
    const newQuestion = new ImportantQuestion({
      branch, year, semester, subject, unit,
      fileUrl: req.file.path,
      filename: req.file.filename,
    });

    await newQuestion.save();
    res.status(201).json({ message: "Important Question uploaded", question: newQuestion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /api/questions/search
// @desc    Search Important Questions by branch, year, semester
router.get("/search", async (req, res) => {
  try {
    const { branch, year, semester, subject } = req.query;
    let query = {};
    if (branch) query.branch = branch;
    if (year) query.year = year;
    if (semester) query.semester = semester;
    if (subject) query.subject = subject;

    const questions = await ImportantQuestion.find(query);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /api/questions/:branch/:year/:semester/:subject
// @desc    Get all Important Questions for a subject
router.get("/:branch/:year/:semester/:subject", async (req, res) => {
  try {
    const { branch, year, semester, subject } = req.params;
    const questions = await ImportantQuestion.find({ branch, year, semester, subject });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   DELETE /api/questions/:id
// @desc    Delete an Important Question record
router.delete("/:id", async (req, res) => {
  try {
    const question = await ImportantQuestion.findById(req.params.id);
    if (!question) return res.status(404).json({ error: "Question not found" });

    // Note: This only deletes from DB. Cloudinary deletion can be added if needed via cloudinary.uploader.destroy(question.filename)
    await ImportantQuestion.findByIdAndDelete(req.params.id);
    res.json({ message: "Important Question deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
