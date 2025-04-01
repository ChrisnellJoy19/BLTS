const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Ordinance = require("../models/Ordinance");
const authenticate = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  }
});

const upload = multer({ storage });

// 🔹 Upload Ordinance Route
router.post("/", authenticate, upload.single("file"), async (req, res) => {
  try {
    const { documentTitle, documentNumber, governanceArea, dateEnacted, administrativeYear, authors, status, description, barangayId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File upload is required" });
    }

    // ✅ Save Ordinance in Database
    const newOrdinance = new Ordinance({
      documentTitle,
      documentNumber,
      governanceArea,
      dateEnacted,
      administrativeYear,
      // authors: JSON.parse(authors), // Convert string array to actual array
      authors: authors ? JSON.parse(authors) : [],
      status,
      description,
      barangayId,
      fileUrl: `/uploads/${req.file.filename}` // Save file path
    });

    await newOrdinance.save();

    res.status(201).json({ message: "Ordinance uploaded successfully", ordinance: newOrdinance });
  } catch (error) {
    console.error("Error uploading ordinance:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

router.get("/", async (req, res) => {
  try {
    const { barangayId } = req.query;

    if (!barangayId) {
      return res.status(400).json({ message: "Barangay ID is required" });
    }

    const ordinances = await Ordinance.find({ barangayId }).populate("barangayId", "name");
    
    res.json(ordinances);
  } catch (error) {
    console.error("Error fetching ordinances:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});



module.exports = router;
