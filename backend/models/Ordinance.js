const mongoose = require("mongoose");

const OrdinanceSchema = new mongoose.Schema({
  documentTitle: { type: String, required: true },
  documentType: { type: String, default: "Ordinance" },
  documentNumber: { type: String, required: true },
  governanceArea: { type: String, required: true },
  dateEnacted: { type: Date, required: true },
  administrativeYear: { type: String, required: true },
  authors: [{ type: String }],
  status: { type: String, enum: ["Draft", "Active", "Repealed"], required: true },
  description: { type: String, required: true },
  barangayId: { type: mongoose.Schema.Types.ObjectId, ref: "Barangay", required: true },
  fileUrl: { type: String, required: true }, // Store the file path or URL
  // isDeleted: { type: Boolean, default: false },
  // isArchived: {type:Boolean, default:false},
  // deletedAt: {type:Boolean, default:null},

}, { timestamps: true });

module.exports = mongoose.model("Ordinance", OrdinanceSchema);
