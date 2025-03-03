const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
});

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;
