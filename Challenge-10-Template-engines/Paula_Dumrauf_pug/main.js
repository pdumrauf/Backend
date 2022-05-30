const express = require('express')
const app = express()
const  Product = require('./api')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', './views')
app.set('view engine', 'pug')

const products = new Product()
const productsArr = products.getProducts()

app.get('', (req, res) => {
    const data = {
        productsArr
    }
    return res.render('form', data)
})

app.get('/products', (req, res) => {
    const data = {
        productsArr
    }
    return res.render('products', data)
})

app.post('/products', (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }

    products.addProduct(product)
    
    return res.redirect('/')
})

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP corriendo en puerto ${PORT}`)
})

server.on('error', error => console.log(`Error en servidor ${error}`))