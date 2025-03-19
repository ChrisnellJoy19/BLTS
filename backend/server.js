const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const municipalityRoutes = require("./routes/municipalities"); // Ensure path is correct

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://blts:blts2025@blts-project.tvawa.mongodb.net/bltsDB?retryWrites=true&w=majority&appName=BLTS-Project", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("✅ MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err);
});

// ✅ Ensure the route is used
app.use("/api/municipalities", municipalityRoutes);

// Default route for testing
app.get("/", (req, res) => {
    res.send("Welcome to the BLTS API");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
