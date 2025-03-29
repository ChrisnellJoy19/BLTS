const mongoose = require("mongoose");

const BarangayProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  municipalityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Municipality",
    required: true,
  },
  adminProfiles: [
    {
      startYear: Number,
      endYear: Number,
      punongBarangay: String,
      barangaySecretary: String,
      email: String,
      sangguniangBarangayMembers: [String],
      sangguniangKabataan: [String],
    },
  ],
  file: {
    type: String, // This will store the file path if an image or document is uploaded
    default: null,
  },
});

module.exports = mongoose.model("Barangay", BarangayProfileSchema);
