const express = require("express");
const { Router } = express;
const productsRouter = Router();
const { products } = require("../daos")();

//const storage = require('../daos')
//const productStorage = storage().products

productsRouter.get("/:id?", async (req, res) => {
    if (req.params.id) {
        return res.json(await products.getItemById(req.params.id));
    }
    return res.json(await products.getItems());
});

productsRouter.post("/", async (req, res) => {
    const newId = await products.createItem(req.body);
    return res.json(newId);
});

productsRouter.put("/:id", async (req, res) => {
    await products.updateItem(req.params.id, req.body);
    return res.sendStatus(204);
});

productsRouter.delete("/:id", async (req, res) => {
    await products.deleteItem(req.params.id);
    return res.sendStatus(204);
});

module.exports = productsRouter;
