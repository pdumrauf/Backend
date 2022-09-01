const logger = require("../src/logs");

class MongoContainer {
    constructor(model) {
        this.model = model;
    }

    getItems = async () => {
        let arr = [];
        try {
            arr = await this.model.find({});
        } catch (err) {
            logger.error(err);
        }
        return arr;
    };

    getItemById = async (id) => {
        let product = {};
        try {
            product = this.model.findById(id);
        } catch (err) {
            logger.error(err);
        }
        return product;
    };

    createItem = async (item) => {
        let newItem = new this.model(item);
        try {
            await newItem.save();
        } catch (err) {
            logger.error(err);
        }
    };

    updateItem = async (id, newItem) => {
        try {
            let product = await this.getItemById(id);
            Object.assign(product, newItem);
            await product.save();
        } catch (err) {
            logger.error(err);
        }
    };

    deleteItem = async (id) => {
        try {
            await this.model.deleteOne({ _id: id });
        } catch (err) {
            logger.error(err);
        }
    };
}

module.exports = MongoContainer;
