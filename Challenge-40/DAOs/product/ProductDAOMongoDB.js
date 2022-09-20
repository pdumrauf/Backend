const productModel = require("../../models/Product");

class ProductDAOMongo {
    constructor() {
        this.model = productModel;
    }
    async saveProduct(product) {
        const newProduct = new this.model(product);
        console.log(newProduct);
        return await newProduct.save();
    }

    async getAll() {
        const allProducts = await this.model.find();
        return allProducts;
    }
}

module.exports = ProductDAOMongo;
