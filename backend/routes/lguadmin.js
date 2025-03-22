const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const LguAdmin = require("../models/LguAdmin");
const Municipality = require("../models/Municipality");
const Barangay = require("../models/Barangay");
const authenticate = require("../middleware/auth");
const mongoose = require('mongoose');

// LGU Admin Login Route
router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const lguAdmin = await LguAdmin.findOne({
      $or: [{ email: identifier }, { name: identifier }]
    });

    if (!lguAdmin) return res.status(400).json({ message: "Invalid username/email or password" });

    const isPasswordValid = await bcrypt.compare(password, lguAdmin.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid username/email or password" });

    const token = jwt.sign(
      { id: lguAdmin._id, municipalityId: lguAdmin.municipalityId },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.json({ message: "Login successful", token, admin: { name: lguAdmin.name, role: "LguAdmin" } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// LGU Admin GET route to fetch admin data and barangay stats
router.get("/", authenticate, async (req, res) => {
  try {
    const lguAdmin = await LguAdmin.findById(req.user.id);
    if (!lguAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const municipality = await Municipality.findById(lguAdmin.municipalityId);
    if (!municipality) {
      return res.status(404).json({ message: "Municipality not found" });
    }

    const barangays = await Barangay.find({
      municipalityId: new mongoose.Types.ObjectId(lguAdmin.municipalityId)
    });

    res.json({
      municipality,
      name: lguAdmin.name,
      barangays,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
