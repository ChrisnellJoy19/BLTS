const mongoose = require("mongoose");

const BarangaySchema = new mongoose.Schema({
    name: String,
    municipalityId: { type: mongoose.Schema.Types.ObjectId, ref: "Municipality" },
    adminYears: [
        {
            startYear: Number,
            endYear: Number
        }
    ]
});

module.exports = mongoose.model("Barangay", BarangaySchema);
