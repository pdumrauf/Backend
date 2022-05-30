const express = require('express')
const productRouter = require('./productRouter')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const publicPath = `${__dirname + '/public'}`
app.use('/form', express.static(publicPath))

app.get('/', (req, res) => {
    return res.json({
        status: 'ok'
    })
})

app.use('/api/products', productRouter)

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP con Express corriendo en el puerto ${PORT}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))