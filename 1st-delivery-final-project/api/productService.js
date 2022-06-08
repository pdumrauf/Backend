const fs = require('fs');

class ProductService {
    constructor(productsFile) {
        this.products = []
        this.productsFile = productsFile
    }

    async loadProducts() {
        try {
            const file = await fs.promises.readFile(this.productsFile, 'utf-8')
            const productArr = JSON.parse(file)
            this.products = productArr
            await fs.promises.writeFile(this.productsFile, JSON.stringify(productArr, null, 2))
        
        } catch {
            console.error('El archivo no existe. Creandolo.')
            await fs.promises.writeFile(this.productsFile, JSON.stringify([], null, 2))
        }
    }

    getProducts() {
        return this.products
    }

    getProductsById(id) {
        return this.products.find(product => product.id === id)
    }

    async addProduct(product) {
        const newProduct = product
        newProduct.timestamp = Date.now()
        newProduct.id = this.products.length + 1
        this.products.push(newProduct)
        await fs.promises.writeFile(this.productsFile, JSON.stringify(this.products,null, 2))
        return newProduct
    }

    async updateProduct(id, productUpdated) {
        const productIndex = this.products.findIndex(product => product.id === id)
        const originalProduct = this.products[productIndex]
        this.products[productIndex] = {...originalProduct, ...productUpdated}
        await fs.promises.writeFile(this.productsFile, JSON.stringify(this.products,null, 2))
        return this.products[productIndex]
    }

    async deleteProduct(id) {
        const productTodelete = this.products.find(product => product.id === id)

        if(!productTodelete) {
            return
        }
        
        const newArr = this.products.filter(product => product.id !== id)
        this.products = newArr
        await fs.promises.writeFile(this.productsFile, JSON.stringify(this.products,null, 2))
        return productTodelete
    }
}

module.exports = ProductService