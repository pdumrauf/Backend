const MongoContainer = require("../../containers/MongoContainer");
const { Product } = require("../../models/Product");

class ProductsDaoMongoDB extends MongoContainer {
    constructor() {
        super(Product);
    }
}

module.exports = ProductsDaoMongoDB;
