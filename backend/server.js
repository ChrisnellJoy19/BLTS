const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const municipalityRoutes = require("./routes/municipalities");
const lguAdminRoutes = require("./routes/lguadmin");
const barangayRoutes = require("./routes/barangays");
const dilgadminRoute = require("./routes/dilgadmin");
const userRoutes = require('./routes/users');  
const ordinanceRoutes = require('./routes/ordinance'); 

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

// Routes
app.use("/api/municipalities", municipalityRoutes);
app.use("/api/lguadmin", lguAdminRoutes);
app.use("/api/barangays", barangayRoutes); 
app.use("/api/dilgadmin", dilgadminRoute);
app.use("/api/user", userRoutes);
app.use("/api/ordinances", ordinanceRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the BLTS API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
