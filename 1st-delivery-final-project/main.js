const express = require('express')
const productRouter = require('./productRouter')
const cartRouter = require('./cartRouter')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)

app.get('/', (req, res) => {
    return res.json({
        status: 'ok'
    })
})

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP con Express corriendo en el puerto ${PORT}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))