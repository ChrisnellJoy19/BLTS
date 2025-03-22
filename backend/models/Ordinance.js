const mongoose = require("mongoose");

const OrdinanceSchema = new mongoose.Schema({
    barangayId: { type: mongoose.Schema.Types.ObjectId, ref: "Barangay" },
    title: String,
    description: String,
    fileUrl: String,
    datePassed: Date,
    status: String,
    uploadedBy: String
});

module.exports = mongoose.model("Ordinance", OrdinanceSchema);
