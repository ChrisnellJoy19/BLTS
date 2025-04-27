const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose"); 
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
      fileUrl: `/uploads/${req.file.filename}`// Save file path
    });

    await newOrdinance.save();

    res.status(201).json({ message: "Ordinance uploaded successfully", ordinance: newOrdinance });
  } catch (error) {
    console.error("Error uploading ordinance:", error);
    if (error instanceof multer.MulterError) {
      // Handling multer-specific errors
      res.status(400).json({ message: `File upload error: ${error.message}` });
    } else {
      // Handling general errors
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  }
});

// Fetch Ordinances Route
router.get("/", async (req, res) => {
  try {
    const { barangayId, isDeleted } = req.query;

    if (!barangayId) {
      return res.status(400).json({ message: "Barangay ID is required" });
    }

    // Construct query for ordinances, filtering by isDeleted if provided
    let query = { barangayId };

    if (isDeleted !== undefined) {
      // Convert isDeleted to boolean
      query.isDeleted = isDeleted === "true";  // "true" or "false" as string from frontend
    }

    const ordinances = await Ordinance.find(query).populate("barangayId", "name");
    res.json(ordinances);
  } catch (error) {
    console.error("Error fetching ordinances:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});


// 🔹 Update Ordinance Route
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

    const updatedOrdinance = await Ordinance.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedOrdinance) {
      return res.status(404).json({ message: "Ordinance not found" });
    }

    res.json({ message: "Ordinance updated successfully", ordinance: updatedOrdinance });
  } catch (error) {
    console.error("Error updating ordinance:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// 🔹 Soft Delete Ordinance Route
router.put("/delete/:id", authenticate, async (req, res) => {
  try {
    // Find the ordinance by ID
    const ordinance = await Ordinance.findById(req.params.id);

    // Check if ordinance exists
    if (!ordinance) {
      return res.status(404).json({ message: "Ordinance not found" });
    }

    // Ensure the user is authorized to delete the ordinance based on barangayId
    if (ordinance.barangayId.toString() !== req.user.barangayId.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this ordinance" });
    }

    // Soft delete the ordinance (mark as deleted)
    ordinance.isDeleted = true;
    ordinance.deletedAt = new Date();

    // Save the updated ordinance
    await ordinance.save();

    // Respond with success
    res.json({ message: "Ordinance deleted", ordinance });
  } catch (error) {
    console.error("Error deleting ordinance:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/restore/:id", async (req, res) => {
  try {
    const ordinance = await Ordinance.findByIdAndUpdate(
      req.params.id,
      { isDeleted: false, deletedAt: null },
      { new: true }
    );
    if (!ordinance) {
      return res.status(404).json({ message: "Ordinance not found" });
    }
    res.json(ordinance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Permanently delete ordinance
router.delete("/permanent-delete/:id", async (req, res) => {
  try {
    const ordinance = await Ordinance.findById(req.params.id);

    if (!ordinance) {
      return res.status(404).json({ message: "Ordinance not found" });
    }

    // Delete associated file if it exists
    if (ordinance.fileUrl) {
      const filename = path.basename(ordinance.fileUrl); // Get the filename from fileUrl
      const filePath = path.join(__dirname, "..", "uploads", filename);

      fs.unlink(filePath, (err) => {
        if (err && err.code !== "ENOENT") {
          console.error("Error deleting file:", err);
          return res.status(500).json({ message: "Failed to delete the associated file" });
        }
      });
    }

    // Delete ordinance from database
    await Ordinance.findByIdAndDelete(req.params.id);

    res.json({ message: "Ordinance and associated file permanently deleted" });
  } catch (err) {
    console.error("Permanent delete error:", err);
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Get ordinances by barangayId (used for dashboard pie chart)
router.get("/barangay/:barangayId", authenticate, async (req, res) => {
  try {
    const { barangayId } = req.params;

    const ordinances = await Ordinance.find({ 
      barangayId,
      isDeleted: false  // Only return active ordinances
    });

    res.json(ordinances);
  } catch (error) {
    console.error("Error fetching ordinances by barangay:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Check for existing documentTitle
router.get("/check-document-title/:title", async (req, res) => {
  const { title } = req.params;
  const { barangayId } = req.query;

  try {
    const exists = await Ordinance.exists({
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
    const exists = await Ordinance.exists({
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


module.exports = router;