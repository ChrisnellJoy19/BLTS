const express = require("express");
const router = express.Router();
const Municipality = require("../models/Municipality"); // Ensure this points to the correct model

// GET all municipalities
router.get("/", async (req, res) => {
    try {
        const municipalities = await Municipality.find();
        res.json(municipalities);
    } catch (error) {
        console.error("❌ Error fetching municipalities:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// GET a single municipality by ID
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

module.exports = router;
