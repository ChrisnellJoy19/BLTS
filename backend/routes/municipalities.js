const express = require('express');
const router = express.Router();
const Municipality = require('../models/Municipality'); // Adjust path as needed

// Get all municipalities
router.get('/', async (req, res) => {
    try {
        const municipalities = await Municipality.find(); // Fetch from MongoDB
        res.json(municipalities);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch municipalities' });
    }
});

module.exports = router;
