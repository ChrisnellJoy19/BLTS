const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin"); // Make sure this path is correct

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://blts:blts2025@blts-project.tvawa.mongodb.net/?retryWrites=true&w=majority&appName=BLTS-Project", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// Log MongoDB connection status
mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Define Municipality Schema & Model
const Municipality = mongoose.model("Municipality", new mongoose.Schema({
  name: String,
  description: String,
  barangays: [{ name: String, ordinances: Number, resolutions: Number }],
}));

// GET route to fetch all municipalities
app.get("/api/municipalities", async (req, res) => {
  try {
    const municipalities = await Municipality.find();
    res.json(municipalities);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// POST route to create a new municipality
app.post("/api/municipalities", async (req, res) => {
  try {
    const { name, description, barangays } = req.body;
    
    const newMunicipality = new Municipality({
      name,
      description,
      barangays,
    });
    
    await newMunicipality.save();
    res.status(201).json({ message: "Municipality created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create municipality", error });
  }
});

// Admin Login Route
app.post("/adminlogin", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const admin = await Admin.findOne({ email});
    if (!admin) return res.status(400).json({ message: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid email or password" });

    res.json({ message: "Login successful", admin: { name: admin.name, role: admin.role } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Start the server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
