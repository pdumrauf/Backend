class Product {
    constructor() {
        this.products = []
    }

    getProducts() {
        return this.products
    }

    getProductsById(id) {
        return this.products.find(product => product.id === id)
    }

    addProduct(product) {
        const newProduct = product
        newProduct.id = this.products.length + 1
        this.products.push(newProduct)
        return newProduct
    }

    updateProduct(id, productUpdated) {
        const productIndex = this.products.findIndex(product => product.id === id)

        productUpdated.id = this.products[productIndex].id
        this.products[productIndex] = productUpdated

        return this.products[productIndex]
    }

    deleteProduct(id) {
        const newArr = this.products.filter(product => product.id !== id)
        this.products = newArr
    }
}

module.exports = Product