const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const  Product = require('./api')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', './views')
app.set('view engine', 'hbs')

const products = new Product()
const productsArr = products.getProducts()

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: `${__dirname}/views/index.hbs`,
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`
}))


app.get('', (req, res) => {
    const data = {
        productsArr
    }
    return res.render('layouts/form', data)
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
    console.log(`Servidor HTTP con Express corriendo en el puerto ${PORT}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))