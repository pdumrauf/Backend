const ProductDTO = require("../DTOs/ProductDTO");
const productDAOFactory = require("../factories/productDAOFactory");

let instance = null;

class ProductRepository {
    constructor() {
        this.dao = productDAOFactory(process.env.STORAGE);
    }

    async saveProduct(product) {
        const prod = await this.dao.saveProduct(product);
        console.log(this.dao);
        const productDTO = new ProductDTO(prod);
        return productDTO;
    }

    async getAll() {
        const prods = await this.dao.getAll();
        const productsDTO = prods.map((prod) => new ProductDTO(prod));
        return productsDTO;
    }

    static getInstance() {
        if (instance) {
            return instance;
        }
        instance = new ProductRepository();
        return instance;
    }
}

module.exports = ProductRepository;
