const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const DilgAdmin = require("../models/DilgAdmin");
const authenticate = require("../middleware/auth");

// DILG Admin Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const dilgAdmin = await DilgAdmin.findOne({ email });

    if (!dilgAdmin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, dilgAdmin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: dilgAdmin._id, role: "DilgAdmin" }, 
      process.env.JWT_SECRET, 
      { expiresIn: "3d" }
    );

    res.json({ 
      message: "Login successful", 
      token, 
      admin: { name: dilgAdmin.name, role: "DilgAdmin" } 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Protected Route Example - Profile
router.get("/profile", authenticate, async (req, res) => {
  try {
    const dilgAdmin = await DilgAdmin.findById(req.user.id);
    if (!dilgAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json({ name: dilgAdmin.name, email: dilgAdmin.email });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
