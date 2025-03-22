const mongoose = require('mongoose');
require('dotenv').config();
const Barangay = require('./models/Barangay');  // Adjust path if needed

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ Error connecting to MongoDB:", err));

async function fixMunicipalityIds() {
    try {
        const affectedBarangays = await Barangay.find();
        
        if (affectedBarangays.length === 0) {
            console.log("✅ No Barangays found. Everything is clean!");
            return;
        }

        let fixedCount = 0;

        for (const barangay of affectedBarangays) {
            const municipalityId = barangay.municipalityId;

            // Log what type it is
            console.log(`📌 Barangay: ${barangay.name} | municipalityId: ${municipalityId} | Type: ${typeof municipalityId}`);

            if (typeof municipalityId === 'string') {
                try {
                    // Convert the string to ObjectId
                    const objectId = new mongoose.Types.ObjectId(municipalityId);
                    barangay.municipalityId = objectId;
                    await barangay.save();
                    
                    console.log(`✅ Fixed Barangay: ${barangay.name} (${municipalityId} ➔ ${objectId})`);
                    fixedCount++;
                } catch (error) {
                    console.error(`❌ Failed to fix ${barangay.name}: Invalid ObjectId string.`);
                }
            }
        }

        if (fixedCount === 0) {
            console.log("✅ No invalid IDs found. Everything looks good!");
        } else {
            console.log(`🎉 Successfully fixed ${fixedCount} Barangay entries.`);
        }
    } catch (error) {
        console.error('❌ Error during cleanup:', error);
    } finally {
        mongoose.connection.close();
    }
}

fixMunicipalityIds();
