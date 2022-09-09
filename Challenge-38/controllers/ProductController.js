const createRandomProducts = require("../src/createRandomProducts");

class ProductController {
    constructor(service) {
        this.service = service;
    }

    async get(req, res) {
        console.log(this);
        const datos = await this.service.getAll();
        return res.send(datos);
    }

    async createRandom(_req, res) {
        const randomProducts = createRandomProducts(5);
        return res.render("partials/productsTable", {
            productos: randomProducts,
        });
    }
}

module.exports = ProductController;
