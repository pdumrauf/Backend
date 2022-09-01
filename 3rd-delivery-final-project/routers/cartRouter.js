const express = require("express");
const { Router } = express;
const cartRouter = Router();
const { carts, products, users } = require("../daos")();
const sendEmail = require("../src/sendEmail");
const sendSMS = require("../src/sendSMS");
const sendWhatsapp = require("../src/sendWhatsapp");

//const storage = require('../daos')
//const cartStorage = storage().carts

cartRouter.post("/", async (req, res) => {
    if (req.user.cart_id) return carts.getItemById(req.user.cart_id);
    const newCartId = await carts.createItem({});
    return res.json(newCartId);
});

cartRouter.delete("/:id", async (req, res) => {
    await carts.deleteItem(req.params.id);
    return res.sendStatus(204);
});

cartRouter.get("/:id/products", async (req, res) => {
    const products = await carts.getCartProducts(req.params.id);
    return res.json(products);
});

cartRouter.delete("/:id/products/:id_prod", async (req, res) => {
    await carts.deleteCartProduct(req.params.id, req.params.id_prod);
    return res.sendStatus(204);
});

cartRouter.post("/:id/products/", async (req, res) => {
    const product = await products.getItemById(req.body.prod_id);
    await carts.addCartProduct(req.params.id, product);
    return res.sendStatus(204);
});

cartRouter.post("/:id", async (req, res) => {
    const cart = await carts.getItemById(req.params.id);
    const productsBought = cart.products.map(
        (product) =>
        `Product: ${product.name} Price: ${product.price}`
    );
    await sendEmail(
        null,
        `New purchase from ${req.user.name} - ${req.user.email}`,
        `<p>${productsBought.join("  ")}</p>`
    );
    const newUser = await users.deleteCart(cart._id);
    console.log(newUser);
    await sendSMS("Your order was confirmed");
    await sendWhatsapp(`New order created by ${req.user.name}`);
    return res.redirect("/home");
});

module.exports = cartRouter;
