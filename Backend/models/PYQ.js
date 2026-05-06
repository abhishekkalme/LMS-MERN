const mongoose = require("mongoose");

const pyqSchema = new mongoose.Schema(
  {
    branch: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: String,
      required: true,
      trim: true,
    },
    semester: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    examSession: {
      type: String, // e.g., "Dec 2023", "June 2024"
      required: true,
      trim: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

pyqSchema.index({ branch: 1, year: 1, semester: 1, subject: 1 });
pyqSchema.index({ examSession: 1 });

module.exports = mongoose.model("PYQ", pyqSchema);
