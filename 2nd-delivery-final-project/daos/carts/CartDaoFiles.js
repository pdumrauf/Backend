const FileContainer = require("../../containers/FileContainer");

// const productsDaoFiles = require("../products/ProductsDaoFiles");
// const productsDao = new productsDaoFiles();

class cartDaoFiles extends FileContainer {
    constructor() {
        super(`carts.json`);
    }

    deleteCartProduct = async (id, prodId) => {
        const cart = await this.getItemById(Number(id));
        const newCartArr = cart.products.filter(
            (prod) => prod.id !== Number(prodId)
        );
        cart.products = [...newCartArr];
        await this.updateItem(id, cart);
        return;
    };

    getCartProducts = async (id) => {
        const cart = await this.getItemById(Number(id));
        return cart.products;
    };

    addCartProduct = async (id, prod) => {
        const cart = await this.getItemById(Number(id));

        cart.products.push(prod);
        await this.updateItem(id, cart);
        return;
    };
}

module.exports = cartDaoFiles;
