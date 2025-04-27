const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Municipality = require("../models/Municipality");
const Barangay = require("../models/Barangay");
const Ordinance = require("../models/Ordinance");
const Resolution = require("../models/Resolution");

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
router.get("/:id", async (req, res) => {
  try {
    const municipalityId = req.params.id;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(municipalityId)) {
      return res.status(400).json({ message: "Invalid municipality ID" });
    }

    // Find the municipality
    const municipality = await Municipality.findById(municipalityId);
    if (!municipality) {
      return res.status(404).json({ message: "Municipality not found" });
    }

    // Get barangays under this municipality
    const barangays = await Barangay.find({ municipalityId });

    const barangayIds = barangays.map(b => b._id);

    // Count ordinances per barangay
    const ordinances = await Ordinance.aggregate([
      {
        $match: {
          barangayId: { $in: barangayIds },
          isDeleted: false,
          status: "Active"
  
        }
      },
      {
        $group: {
          _id: "$barangayId",
          count: { $sum: 1 }
        }
      }
    ]);

    // Count resolutions per barangay (optional)
    const resolutions = await Resolution.aggregate([
      {
        $match: {
          barangayId: { $in: barangayIds },
          isDeleted: false,
          status: "Active"
        }
      },
      {
        $group: {
          _id: "$barangayId",
          count: { $sum: 1 }
        }
      }
    ]);

    // Combine counts into barangay list
    const barangaysWithCounts = barangays.map(barangay => {
      const ord = ordinances.find(o => String(o._id) === String(barangay._id)) || { count: 0 };
      const reso = resolutions.find(r => String(r._id) === String(barangay._id)) || { count: 0 };

      return {
        _id: barangay._id,
        name: barangay.name,
        ordinances: ord.count,
        resolutions: reso.count
      };
    });

    // Return the combined data
    res.json({
      _id: municipality._id,
      name: municipality.name,
      description: municipality.description,
      barangays: barangaysWithCounts
    });

  } catch (error) {
    console.error("❌ Error fetching municipality data with stats:", error);
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

// Get specific barangay by municipalityId and barangayId
router.get('/:municipalityId/barangays/:barangayId', async (req, res) => {
  const { municipalityId, barangayId } = req.params;

  try {
      const barangay = await Barangay.findOne({
          _id: new mongoose.Types.ObjectId(barangayId), // Convert to ObjectId
          municipalityId: municipalityId,
      });

      if (!barangay) {
          return res.status(404).json({ message: 'Barangay not found' });
      }

      // 🔍 Find ordinances and resolutions ensuring proper ID format
      const barangayObjectId = new mongoose.Types.ObjectId(barangayId);
      const ordinances = await Ordinance.find({ barangayId: barangayObjectId, isDeleted: false });
      const resolutions = await Resolution.find({ barangayId: barangayObjectId, isDeleted: false });

      res.json({
          ...barangay.toObject(),
          ordinances,
          resolutions
      });
  } catch (error) {
      console.error("❌ Error fetching barangay:", error);
      res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
