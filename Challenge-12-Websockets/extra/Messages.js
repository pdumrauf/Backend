const fs = require("fs");

class Messages {
    constructor() {
        this.messagesFile = "./extra/messages.json";
    }

    async saveMessage(message) {
        let arr = await this.getAll(this.messagesFile);
        if (arr.length > 0) message.id = arr[arr.length - 1].id + 1;
        else message.id = 1;
        arr.push(message);
        await this.saveFile(arr, this.messagesFile);
        return message.id;
    }

    async getAll() {
        let arr;
        try {
            const file = await fs.promises.readFile(this.messagesFile, "utf-8");
            if (!file) arr = [];
            else arr = JSON.parse(file);
        } catch (err) {
            console.log(err);
        }
        return arr;
    }

    async getUserById(id) {
        const arr = await this.getAll(this.usersFile);
        return arr.find((obj) => obj.id === id) || null;
    }

    async saveFile(newArr, filePath) {
        await fs.promises.writeFile(filePath, JSON.stringify(newArr, null, 2));
    }

    async deleteById(id) {
        const arr = await this.getAll();
        const newArr = arr.filter((el) => el.id !== id);
        await this.saveFile(newArr);
    }

    async deleteAll() {
        const arr = [];
        await this.saveFile(arr);
    }
}

module.exports = Messages;
