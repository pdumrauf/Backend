const express = require('express')
const { Router } = express
const Product = require('./api')
const productRouter = Router()

const productsArr = new Product()

const middlewareProductValidator = (req, res, next) => {
    const newProduct = req.body

    if(!newProduct.name || !newProduct.price) {
        console.log('Invalid request')
        return res.status(400).json({
            error: 'Incomplete body'
        })
    }

    return next()
}

productRouter.get('', (req, res) => {
    const allProducts = productsArr.getProducts()
    return res.json(allProducts)
})

productRouter.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const product = productsArr.getProductsById(id)

    if(!product) {
        return res.status(404).json({
            error: 'Product not found'
        })
    }

    return res.json(product)
})

productRouter.post('', middlewareProductValidator, (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
    };
    const newProduct = productsArr.addProduct(product)
    return res.status(201).json(newProduct)
})

productRouter.put('/:id', (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
    };

    const id = Number(req.params.id)
    const productUpdated = productsArr.updateProduct(id, product)

    if(!productUpdated) {
        return res.status(404).json({
            error: 'Product not found'
        })
    }

    return res.json(productUpdated)
})

productRouter.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const deletedProduct = productsArr.deleteProduct(id)

    if(!deletedProduct) {
        return res.status(404).json({
            error: 'Product not found'
        })
    }
    return res.status(204).json({})
})

module.exports = productRouter