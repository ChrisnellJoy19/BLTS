const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Municipality = require("../models/Municipality");
const Barangay = require("../models/Barangay");

// Fetch all municipalities
router.get("/", async (req, res) => {
    try {
        const municipalities = await Municipality.find();
        res.json(municipalities);
    } catch (error) {
        console.error("❌ Error fetching municipalities:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Fetch a single municipality by ID
router.get("/:id", async (req, res) => {
    try {
        const municipality = await Municipality.findById(req.params.id);
        if (!municipality) {
            return res.status(404).json({ message: "Municipality not found" });
        }
        res.json(municipality);
    } catch (error) {
        console.error("❌ Error fetching municipality by ID:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Fetch barangay statistics (ordinances & resolutions count) per municipality
router.get('/:id/barangays', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid municipality ID format" });
        }

        const barangays = await Barangay.find({ municipalityId: req.params.id });

        res.json(barangays);
    } catch (error) {
        console.error('❌ Error fetching barangays:', error);
        res.status(500).json({ message: 'Server error' });
    }
});




module.exports = router;
