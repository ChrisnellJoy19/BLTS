const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Routes
const municipalitiesRouter = require("./routes/municipalities");
const lguAdminRouter = require("./routes/lguadmin");

app.use("/api/municipalities", municipalitiesRouter);
app.use("/api/lguadmin", lguAdminRouter);  // Notice the new URL

// Start the server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
