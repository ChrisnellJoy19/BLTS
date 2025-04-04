const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");
const Barangay = require("../models/Barangay");

// Set up multer with file size limit and type validation
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file format. Only images or PDFs are allowed."));
    }
    cb(null, true);
  }
});

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
        file: req.file ? `/uploads/${req.file.filename}` : null, // Save the file URL if uploaded
      })),
    });

    await newBarangay.save();
    console.log("✅ Barangay created successfully:", newBarangay);
    res.status(201).json({
      message: "Barangay created successfully",
      barangay: {
        ...newBarangay.toObject(),
        logoUrl: req.file ? `/uploads/${req.file.filename}` : null // Return the full URL of the uploaded file
      }
    });

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

// ✅ Update a Barangay by ID
router.put("/:id", upload.single("file"), async (req, res) => {
  try {
    console.log("Received data:", req.body); // Debugging the incoming data
    const { name, municipalityId, adminProfiles } = req.body;

    // Validate required fields
    if (!name || !municipalityId || !adminProfiles) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let adminData;
    try {
      adminData = typeof adminProfiles === "string" ? JSON.parse(adminProfiles) : adminProfiles;
    } catch (parseError) {
      console.error("Error parsing adminProfiles:", parseError);
      return res.status(400).json({ message: "Invalid adminProfiles format" });
    }

    // Update Barangay document
    const updatedBarangay = await Barangay.findByIdAndUpdate(
      req.params.id,
      {
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
          file: req.file ? `/uploads/${req.file.filename}` : null, // Update file URL if uploaded
        })),
      },
      { new: true, overwrite: true }
    );

    if (!updatedBarangay) {
      return res.status(404).json({ message: "Barangay not found" });
    }

    console.log("Barangay updated:", updatedBarangay);
    res.json({
      message: "Barangay updated successfully",
      barangay: updatedBarangay
    });

  } catch (error) {
    console.error("Error updating barangay:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
