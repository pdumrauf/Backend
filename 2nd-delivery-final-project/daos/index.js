const cartDaoFiles = require("./carts/CartDaoFiles");
const productsDaoFiles = require("./products/ProductsDaoFiles");
const productsDaoMemory = require("./products/ProductsDaoMemory");
const cartDaoMemory = require("./carts/CartDaoMemory");
const productsDaoMongoDB = require("./products/ProductsDaoMongoDB");
const cartDaoMongoDB = require("./carts/CartDaoMongoDB");

const getStorage = () => {
    const storage = process.env.STORAGE;
    switch (storage) {
        case "file":
            return {
                products: new productsDaoFiles("products.json"),
                carts: new cartDaoFiles("cats.json"),
            };
        case "memory":
            return {
                products: new productsDaoMemory(),
                carts: new cartDaoMemory(),
            };
        case "mongodb":
            return {
                products: new productsDaoMongoDB(),
                carts: new cartDaoMongoDB(),
            };
    }
};

module.exports = getStorage;
