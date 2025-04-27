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
  ordinances: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ordinance",
    },
  ],
  resolutions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resolution",
    },
  ],
  adminProfiles: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
      },
      startYear: {
        type: Number,
        required: true,
      },
      endYear: {
        type: Number,
        required: true,
      },
      punongBarangay: {
        type: String,
        required: true,
      },
      barangaySecretary: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
      },
      sangguniangBarangayMembers: {
        type: [String],
        default: [],
      },
      sangguniangKabataan: {
        type: [String],
        default: [],
      },
    },
  ],
  file: {
    type: String,
    default: null,
    validate: {
      validator: function (v) {
        return v == null || /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|gif|pdf)$/i.test(v);
      },
      message: "Invalid file format. Only image or PDF files are allowed.",
    },
  },
  logoUrl: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Barangay", BarangayProfileSchema);
