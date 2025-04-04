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
      startYear: {
        type: Number,
        required: true,  // Ensures that startYear is required for each profile
      },
      endYear: {
        type: Number,
        required: true,  // Ensures that endYear is required for each profile
      },
      punongBarangay: {
        type: String,
        required: true,  // Ensures punongBarangay is required
      },
      barangaySecretary: {
        type: String,
        required: true,  // Ensures barangaySecretary is required
      },
      email: {
        type: String,
        required: true,  // Ensures email is required
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"], // Regex for email validation
      },
      sangguniangBarangayMembers: {
        type: [String],  // Array of strings
        default: [],  // Ensures it defaults to an empty array if no members are provided
      },
      sangguniangKabataan: {
        type: [String],  // Array of strings
        default: [],  // Ensures it defaults to an empty array if no members are provided
      },
    },
  ],

  file: {
    type: String, // This will store the file path if an image or document is uploaded
    default: null,
    validate: {
      validator: function (v) {
        return v == null || /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|gif|pdf)$/i.test(v);
      },
      message: "Invalid file format. Only image or PDF files are allowed.",
    },
  },
});

module.exports = mongoose.model("Barangay", BarangayProfileSchema);
