const mongoose = require("mongoose");

const LguAdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  municipalityId: { type: mongoose.Schema.Types.ObjectId, ref: "Municipality", required: true },
  profileImage: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("LguAdmin", LguAdminSchema);
