const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Middleware to Verify Admin (If only one admin exists, modify accordingly)
const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminUser = await User.findById(decoded.id);

    if (!adminUser) {
      return res.status(403).json({ error: "Access denied." });
    }

    req.admin = adminUser;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};

// Admin Creates Barangay Secretary Account
router.post("/register", verifyAdmin, async (req, res) => {
  try {
    const { 
        municipality, 
        term, 
        punong_barangay, 
        barangay_secretary, 
        barangay, 
        email, 
        sb_member1, 
        sb_member2, 
        sb_member3, 
        sb_member4, 
        sb_member5, 
        sb_member6, 
        sb_member7, 
        password
    } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists" });

    // Validate the term format (e.g., "2024-2026")
    const termPattern = /^\d{4}-\d{4}$/;
    if (!termPattern.test(term)) {
      return res.status(400).json({ error: "Invalid term format. Use YYYY-YYYY format (e.g., 2024-2026)." });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user (default role is barangay secretary)
    user = new User({ 
        municipality, 
        term, 
        punong_barangay, 
        barangay_secretary, 
        barangay, 
        email, 
        sb_member1, 
        sb_member2, 
        sb_member3, 
        sb_member4, 
        sb_member5, 
        sb_member6, 
        sb_member7, 
        password: hashedPassword
    });
    await user.save();

    res.status(201).json({ message: "Barangay Secretary registered successfully by Admin" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: "Invalid email or password" });

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

      // Generate JWT Token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({ message: "Login successful", token, role: user.role });
    } catch (error) {
      console.error("Login Error:", error);  // <-- Add this
      res.status(500).json({ error: "Internal server error" });
    }
});

  

module.exports = router;
