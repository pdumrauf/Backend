const { Router } = require("express");

const ProductController = require("../controllers/ProductController");
const ProductService = require("../services/ProductService");

const productService = new ProductService();
const productController = new ProductController(productService);

const productRouter = new Router();

productRouter.get("/", productController.get.bind(productController));

productRouter.get("/productos-test", productController.createRandom.bind(productController));

module.exports = productRouter;