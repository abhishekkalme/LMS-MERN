const mongoose = require("mongoose");

const syllabusSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  program: { type: String, required: true },
  grading: { type: String, required: true },
  system: { type: String, required: true },
  pdfs: { type: Object, default: {} }, 
}, {
  timestamps: true, 
});

//  Prevent duplicate entries based on this combination
syllabusSchema.index({ code: 1, program: 1, grading: 1, system: 1 }, { unique: true });

module.exports = mongoose.model("Syllabus", syllabusSchema);
