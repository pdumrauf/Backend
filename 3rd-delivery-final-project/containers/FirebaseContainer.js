const parseDoc = require("../src/parseDoc");

class FirebaseContainer {
    constructor(query) {
        this.query = query;
    }

    getItems = async () => {
        let users;
        try {
            const response = await this.query.get();
            const docs = response.docs;
            users = docs.map(parseDoc);
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
        return users;
    };

    getItemById = async (id) => {
        let item;
        try {
            const response = await this.query.doc(id).get();
            item = parseDoc(response);
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
        return item;
    };

    createItem = async (item) => {
        try {
            const user = await this.query.add(item);
            console.log(user);
        } catch (e) {
            console.log(`Error: ${e.message}`);
        }
    };

    updateItem = async (id, newItem) => {
        try {
            await this.query.doc(id).update(newItem);
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    };

    deleteItem = async (id) => {
        try {
            await this.query.doc(id).delete();
        } catch (e) {
            console.log(`Error: ${e.message}`);
        }
    };
}

module.exports = FirebaseContainer;