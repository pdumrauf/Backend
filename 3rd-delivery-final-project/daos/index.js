const cartDaoFiles = require("./carts/CartDaoFiles")
const productsDaoFiles = require("./products/ProductsDaoFiles")
const productsDaoMemory = require("./products/ProductsDaoMemory")
const cartDaoMemory = require("./carts/CartDaoMemory")
const productsDaoMongoDB = require("./products/ProductsDaoMongoDB")
const cartDaoMongoDB = require("./carts/CartDaoMongoDB")
const userDaoMongoDB = require("./users/UserDaoMongoDB");
const productsDaoFirebase = require("./products/ProductsDAOFirebase")
const cartDaoFirebase = require("./carts/CartDAOFirebase")

const getStorage = () => {
    const storage = process.env.STORAGE || "mongodb";
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
                users: new userDaoMongoDB()
            };
        case "firebase":
        return {
            products: new productsDaoFirebase(),
            carts: new cartDaoFirebase(),
        };
    }
};

module.exports = getStorage;
