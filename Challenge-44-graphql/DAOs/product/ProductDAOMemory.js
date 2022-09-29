const BaseDAOMemory = require("../BaseDAOMemory");

const path = `${process.cwd()}/json/products.json`;

class ProductDAOMemory extends BaseDAOMemory {
    constructor() {
        super(path);
    }

    async create(product) {
        let file = await this.getAll();
        product.id = file[file.length - 1].id + 1 || 1;
        file.push(product);
        await this.saveFile(file);
        return product;
    }

    async getAll() {
        let products = await this.readFile();
        return products;
    }

    async getOne(id) {
        let products = await this.readFile();
        let product = products.find((prod) => prod.id === parseInt(id));

        return product;
    }

    async update(id, newProduct) {
        let products = await this.readFile();

        let idx = products.findIndex((prod) => {
            return prod.id === parseInt(id);
        });
        if (idx === -1) return false;
        products[idx] = { ...products[idx], ...newProduct };

        await this.saveFile(products);
        return products[idx];
    }

    async delete(id) {
        let products = await this.readFile();
        const newArr = products.filter(prod => prod.id !== parseInt(id));

        await this.saveFile(newArr);
        return products.length === newArr.length ? false : true;
    }
}

module.exports = ProductDAOMemory;
