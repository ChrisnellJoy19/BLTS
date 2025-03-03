require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/bltsDB";

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// API Route
app.get("/api", (req, res) => {
  res.json({ message: "API is running..." });
});

app.get('/', (req, res) => {
    res.send('Backend is working!');
  });
  
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const Item = require("./models/Item");

// Fetch all items
app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items" });
  }
});

