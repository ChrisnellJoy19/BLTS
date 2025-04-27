const mongoose = require("mongoose");

const MunicipalitySchema = new mongoose.Schema({
  name: String,
  description: String,
  barangays: [
    {
      name: String,
      resolutions: Number,
      ordinances: Number,
    },
  ],
});

module.exports = mongoose.model("Municipality", MunicipalitySchema);