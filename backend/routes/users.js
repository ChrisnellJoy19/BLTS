const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Municipality = require("../models/Municipality");
const Barangay = require("../models/Barangay");
const authenticate = require("../middleware/auth");

// Ensure JWT Secret is set
if (!process.env.JWT_SECRET) {
  console.error("⚠️ JWT_SECRET is missing from environment variables!");
  process.exit(1);
}

// 🔹 User Login Route
router.post("/login", async (req, res) => {
  const identifier = req.body.identifier?.trim().toLowerCase();
  const password = req.body.password?.trim();

  try {
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    console.log("🟢 Login Attempt:", identifier);
    console.log("🔍 Retrieved User:", user);

    if (!user) {
      console.log("🔴 User not found for identifier:", identifier);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("🔐 Checking password...");
    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);

    // Fetch barangay and municipality names & logo
    const barangay = await Barangay.findById(user.barangayId);
    const municipality = await Municipality.findById(user.municipalityId);
    const isPasswordValid = await bcrypt.compare(password.trim(), user.password);

    if (!isPasswordValid) {
      console.log("🔴 Password comparison result:", isPasswordValid);
      return res.status(401).json({ message: "Incorrect password" });
    }

    console.log("✅ Password matched successfully!");

    const token = jwt.sign(
      {
        id: user._id,
        municipalityId: user.municipalityId,
        barangayId: user.barangayId,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      barangay: barangay ? barangay.name : "Unknown Barangay",
      municipality: municipality ? municipality.name : "Unknown Municipality",
      province: "Marinduque", 
      logo: barangay ? barangay.logo : "/images/default_logo.png", // Default logo if none exists
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        municipalityId: user.municipalityId,
        barangayId: user.barangayId,
      },
    });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});


// 🔹 Fetch User Data Route (Protected)
router.get("/", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password field
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// 🔹 Fetch Current Logged-in User Data (Protected)
router.get("/me", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("🔹 Sending User Data:", user); 
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      municipalityId: user.municipalityId,
      barangayId: user.barangayId,  
      role: user.role,
    });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// 🔹 Update user credentials (username, email, password)
router.put("/update", authenticate, async (req, res) => {
  const { username, email, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect current password" });

    if (username && username.trim() !== user.username) user.username = username.trim();
    if (email && email.trim() !== user.email) user.email = email.trim();

    // ✅ Let the schema handle password hashing
    if (newPassword) {
      user.password = newPassword;
    }

    await user.save();

    res.json({
      message: "Profile updated successfully.",
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Error updating user:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});



module.exports = router;
