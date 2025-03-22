const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Barangay = require('../models/Barangay');
const { ObjectId } = mongoose.Types;  // ✅ This is the fix!

// Debug Route to Fetch Barangays
router.get('/municipalities/:municipalityId/barangays', async (req, res) => {
    try {
        console.log("🔍 Received Municipality ID:", req.params.municipalityId);

        // Check if the ID is a valid ObjectId
        const municipalityId = req.params.municipalityId;
        if (!ObjectId.isValid(municipalityId)) {
            return res.status(400).json({ message: "Invalid Municipality ID format" });
        }

        const barangays = await Barangay.find({ municipalityId: municipalityId });
        console.log("✅ Barangays Found:", barangays);

        res.json(barangays);
    } catch (error) {
        console.error('❌ Error fetching barangays:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
