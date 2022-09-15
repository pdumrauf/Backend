const BaseDAOMemory = require("../BaseDAOMemory");

const path = `${process.cwd()}/json/products.json`;

class ProductDAOMemory extends BaseDAOMemory {
    constructor() {
        super(path);
    }

    async saveProduct(product) {
        let file = await this.getAll();
        product.id = file.length ?? 1;
        file.push(product);
        await this.saveFile(file);
        return product;
    }

    async getAll() {
        let products = await this.readFile();
        return products;
    }
}

module.exports = ProductDAOMemory;
