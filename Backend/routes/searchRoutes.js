const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const PYQ = require("../models/PYQ");
const ImportantQuestion = require("../models/ImportantQuestion");

// Mapping of subject codes to names for smarter search
const subjectNames = {
  // First Year
  "BT-101": "Engineering Chemistry",
  "BT-102": "Mathematics-I",
  "BT-103": "English for Communication",
  "BT-104": "Basic Electrical & Electronics Engineering",
  "BT-105": "Engineering Graphics",
  "BT-106": "Workshop Practice",
  "BT-201": "Engineering Physics",
  "BT-202": "Mathematics-II",
  "BT-203": "Basic Mechanical Engineering",
  "BT-204": "Basic Civil Engineering & Mechanics",
  "BT-205": "Basic Computer Engineering",

  // Computer Science & Engineering (CSE)
  "ES-301": "Energy & Environmental Engineering",
  "CS-302": "Discrete Structure",
  "CS-303": "Data Structure (DSA)",
  "CS-304": "Digital Systems",
  "CS-305": "Object Oriented Programming & Methodology (OOP)",
  "BT-401": "Mathematics-III",
  "CS-402": "Analysis Design of Algorithm (ADA)",
  "CS-403": "Software Engineering (SE)",
  "CS-404": "Computer Org. & Architecture (COA)",
  "CS-405": "Operating Systems (OS)",
  "CS-501": "Theory of Computation (TOC)",
  "CS-502": "Database Management Systems (DBMS)",
  "CS-503(A)": "Data Analytics",
  "CS-503(B)": "Pattern Recognition",
  "CS-503(C)": "Cyber Security",
  "CS-504(A)": "Internet and Web Technology (IWT)",
  "CS-504(B)": "Object Oriented Programming",
  "CS-504(C)": "Introduction to Database Management Systems",
  "CS-505": "Linux (LAB)",
  "CS-506": "Python",
  "CS-601": "Machine Learning (ML)",
  "CS-602": "Computer Networks (CN)",
  "CS-603(A)": "Advanced Computer Architecture",
  "CS-603(B)": "Computer Graphics & Visualization",
  "CS-603(C)": "Compiler Design",
  "CS-604(A)": "Knowledge Management",
  "CS-604(B)": "Project Management",
  "CS-604(C)": "Rural Technology & Community Development",
  "CS-605": "Data Analytics Lab",
  "CS-606": "Skill Development Lab",
  "CS-701": "Software Architectures",
  "CS-702(A)": "Computational Intelligence",
  "CS-702(B)": "Deep & Reinforcement Learning",
  "CS-702(C)": "Wireless & Mobile Computing",
  "CS-702(D)": "Big Data",
  "CS-703(A)": "Cryptography & Information Security (CNS)",
  "CS-703(B)": "Data Mining and Warehousing",
  "CS-703(C)": "Agile Software Development",
  "CS-703(D)": "Disaster Management",
  "CS-801": "Internet of Things (IOT)",
  "CS-802(A)": "Block Chain Technologies",
  "CS-802(B)": "Cloud Computing",
  "CS-802(C)": "High Performance Computing",
  "CS-802(D)": "Object Oriented Software Engineering",
  "CS-803(A)": "Image Processing and Computer Vision",
  "CS-803(B)": "Game Theory with Engineering Applications",
  "CS-803(C)": "Internet of Things",
  "CS-803(D)": "Managing Innovation and Entrepreneurship",
};

// @route   GET /api/search
// @desc    Global search for Notes, PYQs, and Questions
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length > 100) {
      return res.status(400).json({ error: "Search query is required and must strictly be under 100 characters" });
    }

    console.log("Global Search Query:", q);

    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const safeQ = escapeRegex(q);
    const searchRegex = new RegExp(safeQ, "i");

    // Find codes that match the name in our mapping
    const matchedCodes = Object.keys(subjectNames).filter(code => 
      subjectNames[code].toLowerCase().includes(q.toLowerCase()) ||
      code.toLowerCase().includes(q.toLowerCase())
    );

    const orQuery = [
      { subject: searchRegex },
      { branch: searchRegex },
      { filename: searchRegex },
    ];
    
    // Add matched codes to the query if any
    if (matchedCodes.length > 0) {
      orQuery.push({ subject: { $in: matchedCodes } });
    }

    // Search in Notes
    const notes = await Note.find({ $or: orQuery }).limit(10);

    // Search in PYQs
    const pyqs = await PYQ.find({
      $or: [
        { subject: searchRegex },
        { subject: { $in: matchedCodes } },
        { branch: searchRegex },
        { examSession: searchRegex },
      ],
    }).limit(10);

    // Search in Important Questions
    const questions = await ImportantQuestion.find({
      $or: [
        { subject: searchRegex },
        { subject: { $in: matchedCodes } },
        { branch: searchRegex },
      ],
    }).limit(10);

    const results = [
      ...notes.map(n => {
        const doc = n.toObject();
        const subjectName = subjectNames[doc.subject] || doc.subject;
        return { 
          ...doc, 
          type: "Note", 
          label: `${subjectName} (Unit ${doc.unit})`,
          subjectName
        };
      }),
      ...pyqs.map(p => {
        const doc = p.toObject();
        const subjectName = subjectNames[doc.subject] || doc.subject;
        return { 
          ...doc, 
          type: "PYQ", 
          label: `${subjectName} (${doc.examSession || ""})`,
          subjectName
        };
      }),
      ...questions.map(q => {
        const doc = q.toObject();
        const subjectName = subjectNames[doc.subject] || doc.subject;
        return { 
          ...doc, 
          type: "Important Question", 
          label: `${subjectName} (Imp Q)`,
          subjectName
        };
      }),
    ];

    // Add static subject results if not already present
    matchedCodes.forEach(code => {
      const alreadyPresent = results.some(r => (r.subjectCode || r.subject) === code);
      if (!alreadyPresent) {
        // Infer metadata
        let branch = "CSE";
        let year = "First Year";
        let semester = "1";

        if (code.startsWith("BT-1")) { year = "First Year"; semester = "1"; }
        else if (code.startsWith("BT-2")) { year = "First Year"; semester = "2"; }
        else if (code.startsWith("CS-3") || code.startsWith("EC-3") || code.startsWith("EX-3")) { year = "Second Year"; semester = "3"; }
        else if (code.startsWith("CS-4")) { year = "Second Year"; semester = "4"; }
        else if (code.startsWith("CS-5")) { year = "Third Year"; semester = "5"; }
        else if (code.startsWith("CS-6")) { year = "Third Year"; semester = "6"; }
        else if (code.startsWith("CS-7")) { year = "Fourth Year"; semester = "7"; }
        else if (code.startsWith("CS-8")) { year = "Fourth Year"; semester = "8"; }

        results.push({
          type: "Note", // Use Note type to reuse CoursePage navigation
          subject: code,
          subjectCode: code,
          subjectName: subjectNames[code],
          label: `${subjectNames[code]} (${code})`,
          branch,
          year,
          semester,
          isPlaceholder: true
        });
      }
    });

    res.status(200).json(results);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ error: "Server error during search" });
  }
});

module.exports = router;
