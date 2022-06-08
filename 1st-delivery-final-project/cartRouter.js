const express = require('express')
const CartService = require('./api/cartService')
const ProductService = require('./api/productService')
const { Router } = express
const cartRouter = Router()

const cartService = new CartService('./carts.txt')
const productService = new ProductService('./products.txt')

cartService.loadCarts()
productService.loadProducts()

cartRouter.get('', (req, res) => {
    const cart = cartService.getCarts()
    return res.json(cart)
})


cartRouter.post('', (req, res) => {
    const newCart = cartService.addCart()
    return res.status(201).json(newCart)
})

cartRouter.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const deletedCart = cartService.deleteCart(id)

    if(!deletedCart) {
        return res.status(404).json({
            error: 'Cart not found'
        })
    }
    return res.status(204).json({})
})

cartRouter.get('/:id/products', (req, res) => {
    const id = Number(req.params.id)
    const cartProducts = cartService.getProductsFromCart(id)

    if(!cartProducts) {
        return res.status(404).json({
            error: 'Cart not found'
        })
    }

    return res.json(cartProducts)
})

cartRouter.post('/:id/products', (req, res) => {
    const cartId = Number(req.params.id)
    const productId = Number(req.body.id_prod)
    const product = productService.getProductsById(productId)

    if(!product) {
        return res.status(404).json({
            error: 'Product not found'
        })
    }
    const cart = cartService.addProductToCart(cartId, product)
    if(!cart) {
        return res.status(404).json({
            error: 'Cart not found'
        })
    }

    return res.status(201).json(cart)
})

cartRouter.delete('/:id/products/:id_prod', (req, res) => {
    const cartId = Number(req.params.id)
    const productId = Number(req.params.id_prod)


    const deletedProduct = cartService.deleteProductFromCart(cartId, productId)

    if(!deletedProduct) {
        return res.status(404).json({
            error: 'Product or Cart not found'
        })
    }
    return res.status(204).json({})
})



module.exports = cartRouter