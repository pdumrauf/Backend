const mongoose = require("mongoose");
const { productSchema } = require("./Product");

const cartSchema = new mongoose.Schema(
    {
        products: [productSchema],
        user_id: { type: mongoose.Schema.ObjectId, required: true },
    },
    { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;