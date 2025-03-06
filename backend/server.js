require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/bltsDB";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


// API Test Route
app.get("/api", (req, res) => {
  res.json({ message: "API is running..." });
});

// Homepage Test Route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Import User Model
const User = require("./models/User");

// User Login API
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, "SECRET_KEY", { expiresIn: "1h" });

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

// Admin-Only Registration API
app.post("/api/auth/register", async (req, res) => {
  const { username, password, role } = req.body;
  
  // Ensure only admin can register new users
  if (req.headers.authorization) {
    try {
      const decoded = jwt.verify(req.headers.authorization, "SECRET_KEY");
      const adminUser = await User.findById(decoded.id);
      
      if (!adminUser || adminUser.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();
    res.json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
