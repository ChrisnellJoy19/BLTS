const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const LguAdmin = require("./models/LguAdmin");
const Municipality = require("./models/Municipality");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://blts:blts2025@blts-project.tvawa.mongodb.net/bltsDB?retryWrites=true&w=majority&appName=BLTS-Project", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

// LGU Admin Login Route
app.post("/lguadminlogin", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const lguAdmin = await LguAdmin.findOne({
      $or: [ { email: identifier }, { name: identifier } ]
    });

    if (!lguAdmin) return res.status(400).json({ message: "Invalid username/email or password" });

    const isPasswordValid = await bcrypt.compare(password, lguAdmin.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid username/email or password" });

    // Generate JWT Token
    const token = jwt.sign({ id: lguAdmin._id, municipalityId: lguAdmin.municipalityId }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ message: "Login successful", token, admin: { name: lguAdmin.name, role: "LguAdmin" } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// GET route to fetch all municipalities
app.get("/api/municipalities", async (req, res) => {
  try {
    const municipalities = await Municipality.find();
    res.json(municipalities);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Start the server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
