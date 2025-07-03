const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const Note = require("../models/Note");

const router = express.Router();

//  Middleware: Extract & inject form/query values into req.customMeta
const extractMetadata = (req, res, next) => {
  const { branch, year, semester, subject, unit } = req.query;

  if (!branch || !year || !semester || !subject || !unit) {
    return res
      .status(400)
      .json({ error: "Missing required fields in query params" });
  }

  req.customMeta = { branch, year, semester, subject, unit };
  next();
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const { branch, year, semester, subject, unit } = req.customMeta || {};
    if (!branch || !year || !semester || !subject || !unit) {
      throw new Error("Missing required fields in form data");
    }

    const clean = (str) => str.trim().replace(/\s+/g, "_");
    const unitNumberOnly = unit.replace(/\D/g, "");

    return {
      folder: `jit_learning_notes/Notes/${clean(branch)}/${clean(year)}/${clean(semester)}/${clean(subject)}/Unit_${unitNumberOnly}`,
      public_id: `${clean(subject)}-unit-${unitNumberOnly}`,
      format: "pdf",
      resource_type: "raw",
      type: "upload",
      use_filename: true,
      access_mode: "public",
    };
  },
});

const upload = multer({ storage });

//  Upload Route
router.post(
  "/upload",
  extractMetadata,
  upload.single("pdf"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const { branch, year, semester, subject, unit } = req.customMeta;

      // 🆕 Save metadata to MongoDB
      const newNote = new Note({
        branch,
        year,
        semester,
        subject,
        unit,
        fileUrl: req.file.path,
        filename: req.file.filename,
        uploadedBy: req.user?._id,
      });

      await newNote.save();

      res.status(200).json({
        message: "PDF uploaded successfully",
        fileUrl: req.file.path,
        filename: req.file.filename,
        note: newNote,
      });
    } catch (err) {
      console.error("Upload failed:", err.message || err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    }
  }
);

module.exports = router;
