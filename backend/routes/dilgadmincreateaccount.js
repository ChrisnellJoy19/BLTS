const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Municipality = require("../models/Municipality");
const Barangay = require("../models/Barangay");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../middleware/mailer"); 

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

  if (!username || !role || !municipality || !barangay || !email || !password || !confirmPassword) {
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

    const foundMunicipality = await Municipality.findOne({ name: municipality });
    if (!foundMunicipality) {
      return res.status(400).json({ message: "Invalid municipality!" });
    }

    let foundBarangay = await Barangay.findOne({
      name: barangay,
      municipalityId: foundMunicipality._id,
    });

    if (!foundBarangay) {
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
      password: password.trim(), // assuming User schema handles hashing
      municipalityId: foundMunicipality._id,
      barangayId: foundBarangay._id,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Prepare the email
    const mailOptions = {
      from: `"BLTS Support" <${process.env.EMAIL_USER}>`,
      to: newUser.email,
      subject: "Welcome to BLTS – Your Account Credentials",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2 style="color: #4CAF50;">Welcome to BLTS!</h2>
          <p>Hi <strong>${newUser.username}</strong>,</p>
          <p>We’re excited to have you onboard. Here are your login credentials:</p>
          <ul>
            <li><strong>Username:</strong> ${newUser.username}</li>
            <li><strong>Email:</strong> ${newUser.email}</li>
            <li><strong>Password:</strong> ${password}</li>
          </ul>
          <p>For security purposes, please <strong>change your password</strong> after your first login.</p>
          <p>If you did not request this account, please contact our support team immediately.</p>
          <br>
          <p style="font-size: 0.9em; color: gray;">Thank you, <br> The BLTS Team</p>
        </div>
      `,
    };

    // SEND EMAIL
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).json({ message: "Account created, but failed to send email!" });
      } else {
        console.log("Email sent successfully:", info.response);
        return res.status(201).json({
          message: "Account created successfully! A confirmation email has been sent.",
          token,
          user: {
            id: newUser._id,
            email: newUser.email,
          },
        });
      }
    });

  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error!" });
  }
});

module.exports = router;
