const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const LguAdmin = require("../models/LguAdmin");

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

    // Generate JWT Token
    const token = jwt.sign(
      { id: lguAdmin._id, municipalityId: lguAdmin.municipalityId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token, admin: { name: lguAdmin.name, role: "LguAdmin" } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
