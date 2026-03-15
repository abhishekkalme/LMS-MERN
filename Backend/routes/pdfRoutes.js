const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//  Utility to replace spaces or camelCase with underscores
const clean = (str) => str.trim().replace(/\s+/g, "_");

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

router.get("/subject-catalog/:branch/:year/:semester/:subject", async (req, res) => {
    let { branch, year, semester, subject } = req.params;
    
    branch = clean(branch);
    year = clean(year);
    semester = clean(semester);
    subject = clean(subject);

    const folderPrefix = `jit_learning_notes/Notes/${branch}/${year}/${semester}/${subject}/`;
    console.log("🔍 Searching Cloudinary with prefix:", folderPrefix);

    try {
        // Try exact prefix first
        let { resources } = await cloudinary.api.resources({
            type: 'upload',
            prefix: folderPrefix,
            resource_type: 'raw',
            max_results: 100
        });

        // Fallback: If no results, try without the leading 'jit_learning_notes/' if it was omitted in upload config
        if (resources.length === 0 && folderPrefix.startsWith("jit_learning_notes/")) {
            const fallbackPrefix = folderPrefix.replace("jit_learning_notes/", "");
            console.log("⚠️ No results with full prefix, trying fallback:", fallbackPrefix);
            const fallbackRes = await cloudinary.api.resources({
                type: 'upload',
                prefix: fallbackPrefix,
                resource_type: 'raw',
                max_results: 100
            });
            resources = fallbackRes.resources;
        }

        console.log(`✅ Found ${resources.length} 'raw' resources`);

        // If no raw resources found, try searching as 'image' (Cloudinary often treats PDFs as images)
        if (resources.length === 0) {
            console.log("⚠️ No 'raw' resources, trying 'image' type...");
            const imageRes = await cloudinary.api.resources({
                type: 'upload',
                prefix: folderPrefix,
                resource_type: 'image',
                max_results: 100
            });
            resources = imageRes.resources;
            console.log(`✅ Found ${resources.length} 'image' resources`);
        }

        // Map resources to find which units are available
        const availableUnits = resources.map(res => {
            // Match Unit_X or Unit X
            const matches = res.public_id.match(/Unit[_-](\d+)/i) || res.public_id.match(/Unit\s(\d+)/i);
            return {
                unit: matches ? matches[1] : null,
                public_id: res.public_id,
                url: res.secure_url,
                createdAt: res.created_at
            };
        }).filter(item => item.unit !== null);

        console.log("🎯 Final Catalog:", availableUnits.map(u => `Unit ${u.unit}`));
        res.status(200).json(availableUnits);
    } catch (error) {
        console.error("❌ Cloudinary catalog error:", error.message);
        res.status(500).json({ message: "Failed to fetch catalog from Cloudinary", error: error.message });
    }
});

module.exports = router;
