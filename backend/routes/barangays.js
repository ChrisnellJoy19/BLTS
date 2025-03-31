const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");
const Barangay = require("../models/Barangay");

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });

// ✅ Create a new barangay with admin profiles
router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("📥 Received request to create barangay:", req.body);

    const { name, municipalityId, adminProfiles } = req.body;

    // 🔍 Validate required fields
    if (!name || !municipalityId || !adminProfiles) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let adminData;
    try {
      adminData = typeof adminProfiles === "string" ? JSON.parse(adminProfiles) : adminProfiles;
    } catch (parseError) {
      console.error("❌ Error parsing adminProfiles JSON:", parseError);
      return res.status(400).json({ message: "Invalid adminProfiles JSON format" });
    }

    // ✅ Validate that adminProfiles is an array
    if (!Array.isArray(adminData)) {
      return res.status(400).json({ message: "adminProfiles should be an array" });
    }

    // ✅ Create new barangay with admin profiles
    const newBarangay = new Barangay({
      name,
      municipalityId,
      adminProfiles: adminData.map(profile => ({
        startYear: profile.startYear,
        endYear: profile.endYear,
        punongBarangay: profile.punongBarangay,
        barangaySecretary: profile.barangaySecretary,
        email: profile.email,
        sangguniangBarangayMembers: profile.sangguniangBarangayMembers || [],
        sangguniangKabataan: profile.sangguniangKabataan || [],
      })),
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

// ✅ Get Administrative Years for a Barangay
router.get("/:id/admin-years", async (req, res) => {
  try {
    console.log(`📥 Fetching administrative years for barangay ID: ${req.params.id}`);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid barangay ID" });
    }

    const barangay = await Barangay.findById(req.params.id);

    if (!barangay) {
      console.log("❌ Barangay not found");
      return res.status(404).json({ message: "Barangay not found" });
    }

    // Extract startYear and endYear from adminProfiles
    const adminYears = barangay.adminProfiles.map(profile => ({
      startYear: profile.startYear,
      endYear: profile.endYear,
      label: `${profile.startYear} - ${profile.endYear}`
    }));

    console.log("✅ Administrative Years Fetched:", adminYears);
    res.json(adminYears);

  } catch (error) {
    console.error("❌ Error fetching administrative years:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
