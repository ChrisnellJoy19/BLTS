const mongoose = require("mongoose");
const DilgAdmin = require("./models/DilgAdmin");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

async function createDilgAdmin() {
  try {
    const newAdmin = new DilgAdmin({
      name: "DILG Admin",
      email: "admin@dilg.com",
      username: "dilgadmin",
      password: "dilg2025"  
    });

    await newAdmin.save();
    console.log("✅ DILG Admin created successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error creating DILG Admin:", error);
    mongoose.connection.close();
  }
}

createDilgAdmin();
