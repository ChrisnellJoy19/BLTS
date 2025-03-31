const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authenticate = require("../middleware/auth");

// Ensure JWT Secret is set
if (!process.env.JWT_SECRET) {
  console.error("⚠️ JWT_SECRET is missing from environment variables!");
  process.exit(1);
}

// 🔹 User Registration Route
router.post("/register", async (req, res) => {
  const { username, password, email, municipalityId, barangayId, role } = req.body;

  try {
    console.log("🔹 Raw Password:", password);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("🔹 Hashed Password:", hashedPassword);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      municipalityId,
      barangayId,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});


// 🔹 User Login Route
router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    console.log("🟢 Login Attempt:", identifier);
    console.log("🔍 Retrieved User:", user);

    if (!user) {
      console.log("🔴 User not found for identifier:", identifier);
      return res.status(400).json({ message: "Invalid username or password" });
    }

    console.log("🔐 Checking password...");
    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);

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

    console.log("🔹 Sending User Data:", user); // 🔥 Log what’s being sent
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      municipalityId: user.municipalityId,
      barangayId: user.barangayId,  // 🔥 Ensure this is included
      role: user.role,
    });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});




module.exports = router;
