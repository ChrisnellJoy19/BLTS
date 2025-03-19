const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const municipalityRoutes = require("./routes/municipalities"); // Correct path

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://blts:blts2025@blts-project.tvawa.mongodb.net/bltsDB?retryWrites=true&w=majority&appName=BLTS-Project");

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Use the municipalities route
app.use("/api/municipalities", municipalityRoutes);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
