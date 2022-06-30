const MongoContainer = require("../../containers/MongoContainer");
const { Product } = require("../../models/product");

class ProductsDaoMongoDB extends MongoContainer {
    constructor() {
        super(Product);
    }
}

module.exports = ProductsDaoMongoDB;
