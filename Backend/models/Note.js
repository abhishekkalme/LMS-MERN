const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
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
    unit: {
      type: String,
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
    },
    approved: {
      type: Boolean,
      default: true,
    },
    feedback: {
      type: String,
      default: "",
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, 
  }
);

noteSchema.index({ branch: 1, year: 1, semester: 1, subject: 1, unit: 1 });
noteSchema.index({ approved: 1, createdAt: -1 });
noteSchema.index({ downloadedBy: 1 });

module.exports = mongoose.model("Note", noteSchema);
