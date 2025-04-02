const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Ordinance = require("../models/Ordinance");
const authenticate = require("../middleware/auth");

// Ensure the uploads folder exists
const uploadFolder = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: uploadFolder,
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB file size limit (adjust as needed)
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf']; // You can add more types if needed
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

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
      authors: authors || [],
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
