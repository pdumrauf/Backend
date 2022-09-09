const fs = require("fs");
const filePath = `${__dirname}/products.json`;

class ProductRepository {
    constructor(type) {
        this.filePath = `${__dirname}/${type}.json`;
    }

    async saveProduct(product) {
        let file = await this.getAll();
        console.log(file, this.filePath);
        product.id = file.length ?? 1;

        file.push(product);
        await this.saveFile(file, this.filePath);
        return product;
    }

    async getAll() {
        let products;
        try {
            const file = await fs.promises.readFile(filePath, "utf-8");
            if (!file) return [];
            else products = JSON.parse(file);
        } catch (err) {
            console.log(err);
        }
        return products;
    }

    async saveFile(newArr, filePath) {
        await fs.promises.writeFile(filePath, JSON.stringify(newArr, null, 2));
    }
}

module.exports = ProductRepository;