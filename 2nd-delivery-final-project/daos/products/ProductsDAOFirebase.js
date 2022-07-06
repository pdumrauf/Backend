const db = require("../../firebase/db");
const FirebaseContainer = require("../../containers/FirebaseContainer");

const query = db.collection("products");

class ProductsDaoFirebase extends FirebaseContainer {
    constructor() {
        super(query);
    }
}

module.exports = ProductsDaoFirebase