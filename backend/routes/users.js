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

const nodemailer = require('nodemailer');
const crypto = require('crypto'); // generate random token

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No user found with this email.' });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Set the reset token and expiration time on the user object
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration
    await user.save();

    // Create a reset link using your BASE_URL
    const resetLink = `${process.env.BASE_URL}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"BLTS Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset Your Password',
      html: `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}" target="_blank">Reset Password</a>
      `,
    };

    // Send the email with the reset link
    await transporter.sendMail(mailOptions);

    res.json({ message: 'Reset link sent to your email.' });

  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { newPassword } = req.body;
  const { token } = req.params;

  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long." });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Check if token hasn't expired
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token." });
    }

    user.password = newPassword; // Schema will auto-hash it
    user.resetPasswordToken = undefined; // Clear token after use
    user.resetPasswordExpires = undefined; // Clear expiry time
    await user.save();

    res.json({ message: "Password has been reset successfully. You can now log in!" });

  } catch (error) {
    console.error("❌ Reset Password error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});



module.exports = router;
