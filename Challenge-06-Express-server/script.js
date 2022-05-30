const fs = require('fs');

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async save(product) {
        try {
            const file = await fs.promises.readFile(this.fileName, 'utf-8')
            const productsArr = JSON.parse(file)
            product.id = productsArr.length + 1
            productsArr.push(product)
            await fs.promises.writeFile(this.fileName, JSON.stringify(productsArr, null, 2))
        
          } catch {
            console.error('El archivo no existe. Creandolo.')
            product.id = 1
            await fs.promises.writeFile(this.fileName, JSON.stringify([product],null, 2))
        }
    }

    async getById(id) {
      try {
        const productsArr = await this.getAll()

        if(!productsArr) {
          return null
        }
        if(!id) {
          return null
        }

        return productsArr.find(element => element.id === id)
      } catch {
        console.error('Hubo un error')
      }
    }

    async getAll() {
      try {
        const file = await fs.promises.readFile(this.fileName, 'utf-8')
        const productsArr = JSON.parse(file)
        return productsArr
      } catch {
        console.error('Hubo un error')
      }
    }

    async deleteById(id) {
      try {
        const file = await fs.promises.readFile(this.fileName, 'utf-8')
        const productsArr = JSON.parse(file)
        const newArrProduct = productsArr.filter(element => element.id !== id)
        await fs.promises.writeFile(this.fileName, JSON.stringify(newArrProduct,null, 2))
      } catch {
        console.error('Hubo un error')
      }
    }

    async deleteAll() {
      try {
        await fs.promises.writeFile(this.fileName, JSON.stringify([],null, 2))
      } catch {
        console.log('Hubo un error')
      }
    }

}

module.exports = Contenedor

const app = async () => { 
  const fileManager = new Contenedor('./products.txt')
    //await fileManager.save({name: 'zapatilla', price: 90})
    //await fileManager.save({name: 'remera', price: 30})
    //await fileManager.save({name: 'jeans', price: 5})
    //const product = await fileManager.getById(1)
    //console.log(product)
    //await fileManager.deleteById(3)
    //await fileManager.deleteAll()
    //const products = await fileManager.getAll()
    //console.log(products)


} 

app()


