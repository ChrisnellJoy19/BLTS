const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import User model
const Municipality = require("../models/Municipality");
const Barangay = require("../models/Barangay");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const {
    username,
    role,
    municipality,
    barangay,
    email,
    password,
    confirmPassword,
  } = req.body;

  if (
    !username ||
    !role ||
    !municipality ||
    !barangay ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match!" });
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // Lookup municipality
    const foundMunicipality = await Municipality.findOne({ name: municipality });
    if (!foundMunicipality) {
      return res.status(400).json({
        message: "Invalid municipality!",
        municipalityFound: false,
      });
    }

    // Lookup barangay or create new one
    let foundBarangay = await Barangay.findOne({
      name: barangay,
      municipalityId: foundMunicipality._id,
    });

    if (!foundBarangay) {
      // Create a new barangay if not found
      foundBarangay = new Barangay({
        name: barangay,
        municipalityId: foundMunicipality._id,
      });
      await foundBarangay.save();
    }

    const newUser = new User({
      username,
      role,
      email: email.toLowerCase(),
      password: password.trim(),
      municipalityId: foundMunicipality._id,
      barangayId: foundBarangay._id,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "Account created successfully!",
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error!" });
  }
});

module.exports = router;