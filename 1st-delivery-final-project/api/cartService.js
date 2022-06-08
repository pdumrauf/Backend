const fs = require('fs');

class CartService {
    constructor(cartFile) {
        this.carts = []
        this.cartFile = cartFile
    }

    async loadCarts() {
        try {
            const file = await fs.promises.readFile(this.cartFile, 'utf-8')
            const cartArr = JSON.parse(file)
            this.carts = cartArr
            await fs.promises.writeFile(this.cartFile, JSON.stringify(cartArr, null, 2))
        
        } catch {
            console.error('El archivo no existe. Creandolo.')
            await fs.promises.writeFile(this.cartFile, JSON.stringify([], null, 2))
        }
    }

    getCarts() {
        return this.carts
    }

    async addCart() {
        const newCart = {}
        newCart.products = []
        newCart.timestamp = Date.now()
        newCart.id = this.carts.length + 1
        this.carts.push(newCart)
        await fs.promises.writeFile(this.cartFile, JSON.stringify(this.carts, null, 2))
        return newCart
    }

    async deleteCart(id) {
        const cartTodelete = this.carts.find(cart => cart.id === id)

        if(!cartTodelete) {
            return
        }
        
        const newArr = this.carts.filter(cart => cart.id !== id)
        this.carts = newArr
        await fs.promises.writeFile(this.cartFile, JSON.stringify(this.carts, null, 2))
        return cartTodelete
    }

    getProductsFromCart(id) {
        const currentCart = this.carts.find(cart => cart.id === id)

        return currentCart ? currentCart.products : null
    }

    async addProductToCart(cartId, product) {
        const currentCartIndex = this.carts.findIndex(cart => cart.id === cartId)
        if(!this.carts[currentCartIndex]) {
            return
        }
        this.carts[currentCartIndex].products = [...this.carts[currentCartIndex].products, product]
        await fs.promises.writeFile(this.cartFile, JSON.stringify(this.carts, null, 2))
        return this.carts[currentCartIndex]
    }

    async deleteProductFromCart(cartId, productId) {
        const currentCartIndex = this.carts.findIndex(cart => cart.id === cartId)
        if(!this.carts[currentCartIndex]) {
            return
        }

        const productTodelete = this.carts[currentCartIndex].products.find(product => product.id === productId)
        if(!productTodelete) {
            return
        }

        const newArr = this.carts[currentCartIndex].products.filter(product => product.id !== productId)
        this.carts[currentCartIndex].products = newArr
        await fs.promises.writeFile(this.cartFile, JSON.stringify(this.carts, null, 2))
        return productTodelete
    }
}

module.exports = CartService