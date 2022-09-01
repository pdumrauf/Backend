const MongoContainer = require("../../containers/MongoContainer");
const Cart = require("../../models/Cart");

class CartDaoMongoDB extends MongoContainer {
    constructor() {
        super(Cart);
    }

    createCart = async (userId) => {
        try {
            const newCart = await this.createItem({ user_id: userId });
            return newCart;
        } catch (err) {
            logger.error(err);
        }
    };

    deleteCartProduct = async (id, prodId) => {
        let cart;
        try {
            cart = await this.getItemById(id);
            cart.products.id(prodId).remove();
            await cart.save();
        } catch (err) {
            logger.error(err);
        }
    };

    getCartByUserId = async (id) => {
        let cart;
        try {
            cart = await this.model.findOne({ user_id: id });
        } catch (err) {
            logger.error(err);
        }
        return cart ? cart : undefined;
    };

    addCartProduct = async (id, product) => {
        try {
            console.log(id);
            let cart = await this.getItemById({ _id: id });
            console.log(cart);
            if (!cart.products) cart.products = [];

            cart.products.push(product);
            await cart.save();
        } catch (err) {
            logger.error(err);
        }
    };
}

module.exports = CartDaoMongoDB;
