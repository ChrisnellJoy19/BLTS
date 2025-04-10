const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const Resolution = require("../models/Resolution");
const authenticate = require("../middleware/auth");

const uploadFolder = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
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
    const { barangayId, isDeleted } = req.query;

    if (!barangayId) {
      return res.status(400).json({ message: "Barangay ID is required" });
    }

    let query = { barangayId };

    if (isDeleted !== undefined) {
      // Convert isDeleted to boolean
      query.isDeleted = isDeleted === "true";  // "true" or "false" as string from frontend
    }

    const resolutions = await Resolution.find(query).populate("barangayId", "name");
    res.json(resolutions);
  } catch (error) {
    console.error("Error fetching resolutions:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

router.put("/:id", authenticate, upload.single("file"), async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = req.body;

    // Log received data for debugging
    console.log("Received update data:", updateData);

    // Validate and convert barangayId only if it's provided
    if (updateData.barangayId) {
      if (!mongoose.Types.ObjectId.isValid(updateData.barangayId)) {
        return res.status(400).json({ message: "Invalid barangayId format" });
      }
      updateData.barangayId = new mongoose.Types.ObjectId(updateData.barangayId);
    }

    if (req.file) {
      updateData.fileUrl = `/uploads/${req.file.filename}`;
    }

    console.log("Final update data:", updateData);

    const updatedResolution = await Resolution.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedResolution) {
      return res.status(404).json({ message: "Reslution not found" });
    }

    res.json({ message: "Resolution updated successfully", resolution: updatedResolution });
  } catch (error) {
    console.error("Error updating resolution:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});


router.put("/delete/:id", authenticate, async (req, res) => {
  try {
    const resolution = await Resolution.findById(req.params.id);

    if (!resolution) {
      return res.status(404).json({ message: "Resolution not found" });
    }

    // Ensure the user is authorized to delete the resolution based on barangayId
    if (resolution.barangayId.toString() !== req.user.barangayId.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this resolution" });
    }

    resolution.isDeleted = true;
    resolution.deletedAt = new Date();

    await resolution.save();

    // Respond with success
    res.json({ message: "Resolution deleted", resolution });
  } catch (error) {
    console.error("Error deleting resolution:", error);
    res.status(500).json({ message: "Server error" });
  }
});

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

router.get("/barangay/:barangayId", authenticate, async (req, res) => {
  try {
    const { barangayId } = req.params;

    const resolutions = await Resolution.find({ 
      barangayId, 
      isDeleted: false // Only return active resolutions
    });

    res.json(resolutions);
  } catch (error) {
    console.error("Error fetching resolutions by barangay:", error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
