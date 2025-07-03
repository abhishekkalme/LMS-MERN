const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//  Utility to replace spaces or camelCase with underscores
const clean = (str) => str.replace(/\s+/g, "_").replace(/([a-z])([A-Z])/g, "$1_$2");

router.get("/download/:branch/:year/:semester/:subjectCode/:unit", async (req, res) => {
  let { branch, year, semester, subjectCode, unit } = req.params;

  //  Normalize values
  branch = clean(branch);
  year = clean(year);
  semester = clean(semester);

  const publicId = `jit_learning_notes/Notes/${branch}/${year}/${semester}/${subjectCode}/Unit_${unit}/${subjectCode}-unit-${unit}.pdf`;

  console.log("🧠 Cloudinary public ID:", publicId);

  try {
    const resource = await cloudinary.api.resource(publicId, {
      resource_type: "raw",
    });

    return res.redirect(resource.secure_url);
  } catch (error) {
    console.error("❌ Cloudinary fetch error:", error.response?.data || error.message || error);
    return res.status(404).json({ message: "File not found on Cloudinary", error: error.message });
  }
});


module.exports = router;
