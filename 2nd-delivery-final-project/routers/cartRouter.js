const express = require("express");
const { Router } = express;
const cartRouter = Router();
const { carts } = require("../daos")();

//const storage = require('../daos')
//const cartStorage = storage().carts

cartRouter.post("/", async (req, res) => {
    const newCartId = await carts.createItem({});
    res.json(newCartId);
});

cartRouter.delete("/:id", async (req, res) => {
    await carts.deleteItem(req.params.id);
    return res.sendStatus(204);
});

cartRouter.get("/:id/productos", async (req, res) => {
    const products = await carts.getCartProducts(req.params.id);
    return res.json(products);
});

cartRouter.delete("/:id/productos/:id_prod", async (req, res) => {
    await carts.deleteCartProduct(req.params.id, req.params.id_prod);
    return res.sendStatus(204);
});

cartRouter.post("/:id/productos/", async (req, res) => {
    await carts.addCartProduct(req.params.id, req.body);
    return res.sendStatus(204);
});

module.exports = cartRouter;
