const logger = require("../src/logs");

class ProductService {
    constructor(repository) {
        this.repository = repository;
    }
    async getAll() {
        const data = await this.repository.getAll();
        return data;
    }
    async createProduct(data) {
        try {
            return await this.repository.saveProduct(data);
        } catch (err) {
            logger.error(err.message);
        }
    }
}

module.exports = ProductService;