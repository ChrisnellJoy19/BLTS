const express = require("express");
const router = express.Router();
const Ordinance = require("../models/Ordinance"); // Import Ordinance model

// Get all ordinances
router.get("/", async (req, res) => {
  try {
    const ordinances = await Ordinance.find();
    res.json(ordinances);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ordinances", error });
  }
});

// Get a single ordinance by ID
router.get("/:id", async (req, res) => {
  try {
    const ordinance = await Ordinance.findById(req.params.id);
    if (!ordinance) return res.status(404).json({ message: "Ordinance not found" });
    res.json(ordinance);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ordinance", error });
  }
});

// Create a new ordinance
router.post("/", async (req, res) => {
  try {
    const { barangayId, title, description, fileUrl, enactmentDate, status, author, governanceArea, adminYears } = req.body;

    // Validate governance area
    if (!["Local", "Regional"].includes(governanceArea)) {
      return res.status(400).json({ message: "Invalid governance area. Choose 'Local' or 'Regional'." });
    }

    // Validate admin years (must be an array of numbers)
    if (adminYears && !Array.isArray(adminYears) || adminYears.some(year => typeof year !== "number")) {
      return res.status(400).json({ message: "adminYears must be an array of numbers." });
    }

    const newOrdinance = new Ordinance({
      barangayId,
      title,
      description,
      fileUrl,
      enactmentDate,
      status,
      author,
      governanceArea,
      adminYears
    });

    await newOrdinance.save();
    res.status(201).json(newOrdinance);
  } catch (error) {
    res.status(500).json({ message: "Error creating ordinance", error });
  }
});

// Update an ordinance
router.put("/:id", async (req, res) => {
  try {
    const { governanceArea, adminYears } = req.body;

    // Validate governance area
    if (governanceArea && !["Local", "Regional"].includes(governanceArea)) {
      return res.status(400).json({ message: "Invalid governance area. Choose 'Local' or 'Regional'." });
    }

    // Validate admin years (must be an array of numbers)
    if (adminYears && !Array.isArray(adminYears) || adminYears.some(year => typeof year !== "number")) {
      return res.status(400).json({ message: "adminYears must be an array of numbers." });
    }

    const updatedOrdinance = await Ordinance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrdinance) return res.status(404).json({ message: "Ordinance not found" });
    res.json(updatedOrdinance);
  } catch (error) {
    res.status(500).json({ message: "Error updating ordinance", error });
  }
});

// Delete an ordinance
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrdinance = await Ordinance.findByIdAndDelete(req.params.id);
    if (!deletedOrdinance) return res.status(404).json({ message: "Ordinance not found" });
    res.json({ message: "Ordinance deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting ordinance", error });
  }
});

module.exports = router;
