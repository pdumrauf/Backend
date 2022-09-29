const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
});

module.exports = model("Product", ProductSchema);