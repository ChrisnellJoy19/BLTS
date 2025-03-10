const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  municipality: String,
  term: String, // Example: "2024-2026"
  punong_barangay: String,
  barangay_secretary: String,
  barangay: String,
  sb_member1: String,
  sb_member2: String,
  sb_member3: String,
  sb_member4: String,
  sb_member5: String,
  sb_member6: String,
  sb_member7: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("User", UserSchema);
