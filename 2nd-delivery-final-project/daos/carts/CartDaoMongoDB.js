const MongoContainer = require("../../containers/MongoContainer");
const Cart = require("../../models/cart");

class CartDaoMongoDB extends MongoContainer {
    constructor() {
        super(Cart);
    }

    deleteCartProduct = async (id, prodId) => {
        let cart;
        try {
            cart = await this.getItemById(id);
            cart.products.id(prodId).remove();
            await cart.save();
        } catch (err) {
            console.log(err);
        }
    };

    getCartProducts = async (id) => {
        let cart;
        try {
            cart = await this.getItemById(id);
        } catch (err) {
            console.log(err);
        }
        return cart.products;
    };

    addCartProduct = async (id, prod) => {
        try {
            let cart = await this.getItemById(id);
            cart.products.push(prod);
            await cart.save();
        } catch (err) {
            console.log(err);
        }
    };
}

module.exports = CartDaoMongoDB;
