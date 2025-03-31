const mongoose = require("mongoose");

const OrdinanceSchema = new mongoose.Schema({
    barangayId: { type: mongoose.Schema.Types.ObjectId, ref: "Barangay" },
    title: String,
    description: String,
    fileUrl: String,
    enactmentDate: Date,
    status: String,
    author: String,
    governanceArea: { type: String, enum: ["Local", "Regional"], required: true }, // New Field
    adminYears: [{ type: Number }]
});

module.exports = mongoose.model("Ordinance", OrdinanceSchema);
