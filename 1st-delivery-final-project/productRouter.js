const express = require('express')
const { Router } = express
const ProductService = require('./api/productService')
const productRouter = Router()
const { middlewareProductValidator, middlewareCheckAdmin } = require('./api/middleware')
const productService = new ProductService('./products.txt')

productService.loadProducts()

productRouter.get('', (req, res) => {
    const allProducts = productService.getProducts()
    return res.json(allProducts)
})

productRouter.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const product = productService.getProductsById(id)

    if(!product) {
        return res.status(404).json({
            error: 'Product not found'
        })
    }

    return res.json(product)
})

productRouter.post('', middlewareCheckAdmin, middlewareProductValidator, (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        description: req.body.description,
        stock: req.body.stock,
        code: req.body.code
    };
    const newProduct = productService.addProduct(product)
    return res.status(201).json(newProduct)
})

productRouter.put('/:id', middlewareCheckAdmin, (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        description: req.body.description,
        stock: req.body.stock,
        code: req.body.code
    };

    const id = Number(req.params.id)
    const productUpdated = productService.updateProduct(id, product)

    if(!productUpdated) {
        return res.status(404).json({
            error: 'Product not found'
        })
    }

    return res.json(productUpdated)
})

productRouter.delete('/:id', middlewareCheckAdmin, (req, res) => {
    const id = Number(req.params.id)
    const deletedProduct = productService.deleteProduct(id)

    if(!deletedProduct) {
        return res.status(404).json({
            error: 'Product not found'
        })
    }
    return res.status(204).json({})
})

module.exports = productRouter