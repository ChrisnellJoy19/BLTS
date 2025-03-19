const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
<<<<<<< Updated upstream
require("dotenv").config();
=======

const municipalityRoutes = require("./routes/municipalities"); // Ensure path is correct
>>>>>>> Stashed changes

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
<<<<<<< Updated upstream
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
=======
mongoose.connect("mongodb+srv://blts:blts2025@blts-project.tvawa.mongodb.net/bltsDB?retryWrites=true&w=majority&appName=BLTS-Project", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
>>>>>>> Stashed changes
});

mongoose.connection.on("connected", () => {
    console.log("✅ MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err);
});

<<<<<<< Updated upstream
// Routes
const municipalitiesRouter = require("./routes/municipalities");
const lguAdminRouter = require("./routes/lguadmin");

app.use("/api/municipalities", municipalitiesRouter);
app.use("/api/lguadmin", lguAdminRouter);  // Notice the new URL

// Start the server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
=======
// ✅ Ensure the route is used
app.use("/api/municipalities", municipalityRoutes);

// Default route for testing
app.get("/", (req, res) => {
    res.send("Welcome to the BLTS API");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
>>>>>>> Stashed changes
