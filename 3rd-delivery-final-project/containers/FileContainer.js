const fs = require("fs");

class FileContainer {
    constructor(filename) {
        this.filename = `${__dirname}/${filename}`;
    }

    saveItems = async (newArr) => {
        try {
            await fs.promises.writeFile(
                this.filename,
                JSON.stringify(newArr, null, 2)
            );
        } catch (err) {
            throw new Error(err);
        }
    };

    getItems = async () => {
        console.log("HELO", this.filename);
        let arr;
        try {
            const file = await fs.promises.readFile(this.filename, "utf-8");
            if (!file) arr = [];
            else arr = JSON.parse(file);
        } catch (err) {
            throw Error(err);
        }
        return arr;
    };

    getItemById = async (id) => {
        let arr = await this.getItems(this.filename);
        let item = arr.find((o) => o.id === Number(id));
        return item;
    };

    createItem = async (item) => {
        const itemArr = await this.getItems(this.filename);
        const lastId = itemArr.length > 0 ? itemArr[itemArr.length - 1].id : 0;
        item.id = lastId + 1;
        item.created_at = Date.now();
        itemArr.push(item);
        this.saveItems(itemArr);
        return item.id;
    };

    updateItem = async (id, newItem) => {
        const itemArr = await this.getItems();
        console.log("HOLI");
        const newArr = itemArr.map((item) => {
            if (Number(id) !== item.id) return item;
            else {
                return Object.assign(item, newItem);
            }
        });
        this.saveItems(newArr);
        return;
    };

    deleteItem = async (id) => {
        const itemArr = await this.getItems();
        const newArr = itemArr.filter((item) => item.id !== Number(id));
        this.saveItems(newArr);
        return;
    };
}

module.exports = FileContainer;
