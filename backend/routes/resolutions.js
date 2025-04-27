const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const Resolution = require("../models/Resolution");
const authenticate = require("../middleware/auth");

// Ensure uploads folder exists
const uploadFolder = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Multer setup
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// 🔹 Check for existing documentTitle
router.get("/check-document-title/:title", async (req, res) => {
  const { title } = req.params;
  const { barangayId } = req.query;

  try {
    const exists = await Resolution.exists({
      documentTitle: title.trim(),
      barangayId,
      isDeleted: false
    });

    res.json({ exists: !!exists });
  } catch (error) {
    console.error("Error checking documentTitle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Check for existing documentNumber
router.get("/check-document-number/:number", async (req, res) => {
  const { number } = req.params;
  const { barangayId } = req.query;

  try {
    const exists = await Resolution.exists({
      documentNumber: number.trim(),
      barangayId,
      isDeleted: false
    });

    res.json({ exists: !!exists });
  } catch (error) {
    console.error("Error checking documentNumber:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Upload new Resolution
router.post("/", authenticate, upload.single("file"), async (req, res) => {
  try {
    const {
      documentTitle,
      documentNumber,
      governanceArea,
      dateEnacted,
      administrativeYear,
      authors,
      status,
      description,
      barangayId
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File upload is required" });
    }

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
      fileUrl: `/uploads/${req.file.filename}`
    });

    await newResolution.save();

    res.status(201).json({ message: "Resolution uploaded successfully", resolution: newResolution });
  } catch (error) {
    console.error("Error uploading Resolution:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// 🔹 Get all Resolutions (with optional filters)
router.get("/", async (req, res) => {
  try {
    const { barangayId, isDeleted } = req.query;

    if (!barangayId) {
      return res.status(400).json({ message: "Barangay ID is required" });
    }

    const query = { barangayId };
    if (isDeleted !== undefined) {
      query.isDeleted = isDeleted === "true";
    }

    const resolutions = await Resolution.find(query).populate("barangayId", "name");
    res.json(resolutions);
  } catch (error) {
    console.error("Error fetching resolutions:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// 🔹 Get Resolutions by barangay (active only)
router.get("/barangay/:barangayId", authenticate, async (req, res) => {
  try {
    const { barangayId } = req.params;

    const resolutions = await Resolution.find({ barangayId, isDeleted: false });
    res.json(resolutions);
  } catch (error) {
    console.error("Error fetching resolutions by barangay:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Update Resolution
router.put("/:id", authenticate, upload.single("file"), async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = req.body;

    if (updateData.barangayId && !mongoose.Types.ObjectId.isValid(updateData.barangayId)) {
      return res.status(400).json({ message: "Invalid barangayId format" });
    }

    if (updateData.barangayId) {
      updateData.barangayId = new mongoose.Types.ObjectId(updateData.barangayId);
    }

    if (req.file) {
      updateData.fileUrl = `/uploads/${req.file.filename}`;
    }

    const updatedResolution = await Resolution.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedResolution) {
      return res.status(404).json({ message: "Resolution not found" });
    }

    res.json({ message: "Resolution updated successfully", resolution: updatedResolution });
  } catch (error) {
    console.error("Error updating resolution:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// 🔹 Soft Delete
router.put("/delete/:id", authenticate, async (req, res) => {
  try {
    const resolution = await Resolution.findById(req.params.id);

    if (!resolution) {
      return res.status(404).json({ message: "Resolution not found" });
    }

    if (resolution.barangayId.toString() !== req.user.barangayId.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this resolution" });
    }

    resolution.isDeleted = true;
    resolution.deletedAt = new Date();

    await resolution.save();
    res.json({ message: "Resolution deleted", resolution });
  } catch (error) {
    console.error("Error deleting resolution:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Restore
router.put("/restore/:id", async (req, res) => {
  try {
    const resolution = await Resolution.findByIdAndUpdate(
      req.params.id,
      { isDeleted: false, deletedAt: null },
      { new: true }
    );

    if (!resolution) {
      return res.status(404).json({ message: "Resolution not found" });
    }

    res.json(resolution);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Permanent Delete
router.delete("/permanent-delete/:id", async (req, res) => {
  try {
    const deleted = await Resolution.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Resolution not found" });
    }

    res.json({ message: "Resolution permanently deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
