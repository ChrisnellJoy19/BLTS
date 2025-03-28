const mongoose = require("mongoose");

const BarangaySchema = new mongoose.Schema({
    name: { type: String, required: true },
    municipalityId: { type: mongoose.Schema.Types.ObjectId, ref: "Municipality" },
    adminProfiles: [
        {
            startYear: Number,
            endYear: Number,
            punongBarangay: { type: String, required: true },
            barangaySecretary: { type: String, required: true },
            email: { type: String },  
            sangguniangBarangayMembers: [{ type: String }], 
            file: { type: String },
            sangguniangKabataan: [{ type: String}]
        }
    ]
});

module.exports = mongoose.model("Barangay", BarangaySchema);
