const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Resolution = require("../models/Resolution");
const authenticate = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  }
});

const upload = multer({ storage });
  

// 🔹 Upload Resolution Route
router.post("/", authenticate, upload.single("file"), async (req, res) => {
  try {
    const { documentTitle, documentNumber, governanceArea, dateEnacted, administrativeYear, authors, status, description, barangayId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File upload is required" });
    }

    // ✅ Save Resolution in Database
    const newResolution = new Resolution({
      documentTitle,
      documentNumber,
      governanceArea,
      dateEnacted,
      administrativeYear,
      authors: authors ? JSON.parse(authors) : [],
      status,
      description,
      barangayId,
      fileUrl: `/uploads/${req.file.filename}` // Save file path
    });

    await newResolution.save();

    res.status(201).json({ message: "Resolution uploaded successfully", resolution: newResolution });
  } catch (error) {
    console.error("Error uploading Resolution:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// 🔹 Get All Resolutions
router.get("/", async (req, res) => {
  try {
    const { barangayId } = req.query;

    if (!barangayId) {
      return res.status(400).json({ message: "Barangay ID is required" });
    }
    const resolutions = await Resolution.find({ barangayId }).populate("barangayId", "name");
    res.json(resolutions);
  } catch (error) {
    console.error("Error fetching resolutions:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
