const express = require('express')
const Contenedor = require('./script')
const app = express()

app.get('/productos', async (req, res) => {
    const fileManager = new Contenedor('./products.txt')
    const productsArr = await fileManager.getAll()
    return res.send(productsArr)
})

app.get('/productosRandom', async (req, res) => {
    const fileManager = new Contenedor('./products.txt')
    const productsArr = await fileManager.getAll()
    const random = Math.floor(Math.random() * productsArr.length + 1)
    const product = productsArr.find(element => {
        return element.id === random
    })
    //console.log(random)
    //console.log(product)
    return res.send(product, null, 2)
})

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP con Express corriendo en el puerto ${PORT}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))