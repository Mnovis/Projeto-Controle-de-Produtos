const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  purchase: Number,
  selling: Number,
});

module.exports = mongoose.model("Product", ProductSchema);