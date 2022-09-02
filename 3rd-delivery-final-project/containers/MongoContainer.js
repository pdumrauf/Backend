const logger = require("../src/logs");

class MongoContainer {
    constructor(model) {
        this.model = model;
    }

    getItems = async () => {
        let arr = [];
        try {
            //console.log(model);
            arr = await this.model.find({});
        } catch (err) {
            logger.error(err);
        }
        return arr;
    };

    getItemById = async (id) => {
        let item = {};
        try {
            item = this.model.findById(id);
        } catch (err) {
            logger.error(err);
        }
        return item;
    };

    createItem = async (item) => {
        let newItem = new this.model(item);

        try {
            await newItem.save();
            return newItem;
        } catch (err) {
            throw Error(err);
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
