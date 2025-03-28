const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");
const Barangay = require("../models/Barangay");

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });

// ✅ Create a new barangay with admin profile
router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("📥 Received request to create barangay:", req.body);

    const { name, municipalityId, adminProfile } = req.body;

    if (!name || !municipalityId || !adminProfile) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let adminData;
    try {
      adminData = JSON.parse(adminProfile);
    } catch (parseError) {
      console.error("❌ Error parsing adminProfile JSON:", parseError);
      return res.status(400).json({ message: "Invalid adminProfile JSON format" });
    }

    // ✅ Create new barangay with admin profile
    const newBarangay = new Barangay({
      name,
      municipalityId,
      adminProfile: {
        fromDate: adminData.fromDate,
        toDate: adminData.toDate,
        punongBarangay: adminData.punongBarangay,
        barangaySecretary: adminData.barangaySecretary,
        email: adminData.email,
        sbMembers: adminData.sbMembers,
        sangguniangKabataan: adminData.sangguniangKabataan,
      },
      file: req.file ? req.file.path : null, // Save file path if uploaded
    });

    await newBarangay.save();
    console.log("✅ Barangay created successfully:", newBarangay);
    res.status(201).json({ message: "Barangay created successfully", barangay: newBarangay });

  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Get a Barangay by ID
router.get("/:id", async (req, res) => {
  try {
    console.log(`🔍 Fetching barangay with ID: ${req.params.id}`);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid barangay ID" });
    }

    const barangay = await Barangay.findById(req.params.id);
    if (!barangay) {
      console.log("❌ Barangay not found");
      return res.status(404).json({ message: "Barangay not found" });
    }

    console.log("✅ Barangay found:", barangay);
    res.json(barangay);

  } catch (error) {
    console.error("❌ Error fetching barangay:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
