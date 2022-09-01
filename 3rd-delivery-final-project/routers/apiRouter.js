const express = require("express");
const { Router } = express;
const logger = require("../src/logs");
const { checkAuthenticated } = require("../middleware/authenticate");
const { products, carts, users } = require("../daos")();

const apiRouter = new Router();
apiRouter.use(checkAuthenticated);

apiRouter.get("/home", async (req, res) => {
    const user = await users.getItemById(req.user._id);
    const sanitizedUser = { name: user.name, photo_url: user.photo_url, _id: user._id, cart_id: user.cart_id };
    console.log(sanitizedUser)
    if (!sanitizedUser.cart_id) {
        const response = await carts.createCart(req.user._id);
        await users.addCart(user._id, response._id);
    }

    const response = await products.getItems();
    const allProducts = response.map((product) => ({
        name: product.name,
        photo_url: product.photo_url,
        description: product.description,
        price: product.price,
        _id: product._id,
    }));

    return res.render("partials/home", { sanitizedUser, allProducts });
});

apiRouter.get("/cart", async (req, res) => {
    try {
        const user = await users.getItemById(req.user._id);
        const sanitizedUser = { name: user.name, photo_url: user.photo_url, _id: user._id, cart_id: user.cart_id };
        const response = await carts.getItemById(sanitizedUser.cart_id);

        const allProducts = response.products.map((product) => ({
            name: product.name,
            photo_url: product.photo_url,
            description: product.description,
            price: product.price,
            _id: product._id,
        }));

        return res.render("partials/cart", { sanitizedUser, cart: { allProducts, cart_id: response._id } });
    } catch (err) {
        logger.error(err);
    }
});

module.exports = apiRouter;