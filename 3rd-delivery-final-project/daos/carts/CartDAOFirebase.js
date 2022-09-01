const FirebaseContainer = require("../../containers/FirebaseContainer");
const db = require("../../firebase/db");

const query = db.collection("carts");

class CartDaoFirebase extends FirebaseContainer {
    constructor() {
        super(query);
    }

    deleteCartProduct = async (id, prodId) => {
        try {
            const cart = await this.getItemById(id);
            const newProdsCart = cart.products.filter(
                (prod) => prod.id !== prodId
            );
            await this.updateItem(cart.id, { products: newProdsCart });
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
            console.log(cart);
            cart.products.push(prod);
            await this.updateItem(cart.id, cart);
        } catch (err) {
            console.log(err);
        }
    };
}

module.exports = CartDaoFirebase;