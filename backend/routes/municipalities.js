const express = require("express");
const router = express.Router();
const Municipality = require("../models/Municipality");

// Fetch all municipalities
router.get("/", async (req, res) => {
  try {
    const municipalities = await Municipality.find();
    res.json(municipalities);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
