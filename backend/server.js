const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");


const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ✅ Middleware to Log Incoming Requests
app.use((req, res, next) => {
    console.log(`📥 Received ${req.method} request on ${req.url}`);
    if (Object.keys(req.body).length) {
        console.log("📦 Request Body:", req.body);
    }
    next();
});

const municipalityRoutes = require("./routes/municipalities");
const barangayRoutes = require("./routes/barangays");
const dilgadminRoute = require("./routes/dilgadmin");
const userRoutes = require('./routes/users');  
const ordinanceRoutes = require('./routes/ordinances'); 
const resolutionsRoutes = require('./routes/resolutions');
// const archiveordinancesRoutes = require('./routes/archiveordinances');
const dilgadmincreateaccountRoutes = require('./routes/dilgadmincreateaccount');

console.log("Loaded environment variables:");
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("PORT:", process.env.PORT);
console.log("JWT_SECRET:", process.env.JWT_SECRET);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Check if Barangay Routes are Loaded
console.log("✅ Barangay routes loaded");

// Routes
app.use("/api/municipalities", municipalityRoutes);
app.use("/api/barangays", barangayRoutes); 
app.use("/api/dilgadmin", dilgadminRoute);
app.use("/api/user", userRoutes);
app.use("/api/ordinances", ordinanceRoutes);
app.use("/api/resolutions", resolutionsRoutes);
// app.use("/api/archiveordinances", archiveordinancesRoutes);
app.use("/api/dilgadmincreateaccount", dilgadmincreateaccountRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
    res.send("Welcome to the BLTS API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`));
