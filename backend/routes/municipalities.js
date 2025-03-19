const express = require("express");
const router = express.Router();
const Municipality = require("../models/Municipality"); // Ensure correct path

// GET all municipalities
router.get("/", async (req, res) => {
  try {
    const municipalities = await Municipality.find();
    res.json(municipalities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching municipalities", error });
  }
});

// POST a new municipality
router.post("/", async (req, res) => {
  try {
    const { name, description, barangays } = req.body;

    const newMunicipality = new Municipality({
      name,
      description,
      barangays,
    });

    await newMunicipality.save();
    res.status(201).json({ message: "Municipality created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create municipality", error });
  }
});

module.exports = router;
