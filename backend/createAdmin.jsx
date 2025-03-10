const bcrypt = require("bcryptjs"); // Use bcryptjs for better compatibility
const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect("mongodb://localhost:27017/bltsDB", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

async function createAdmin() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  const admin = new User({
    name: "Admin User",  // Add a name
    email: "admin@example.com",  // Add an email
    username: "admin",
    password: hashedPassword,
    role: "admin"
  });

  try {
    await admin.save();
    console.log("✅ Admin user created successfully!");
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  } finally {
    mongoose.disconnect();
  }
}

createAdmin();
