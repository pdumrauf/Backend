const fs = require("fs");
const print = require("../src/print");
const filePath = `${__dirname}/messages.json`;

class MessageRepository {
    constructor(type) {
        this.filePath = `${__dirname}/${type}.json`;
    }

    async saveMessage(message) {
        let file = await this.getAll(filePath);
        print(file.messages);
        file.messages.push(message);
        await this.saveFile(file, this.filePath);
        return message.id;
    }

    async getAll() {
        let messages;
        try {
            const file = await fs.promises.readFile(this.filePath, "utf-8");
            if (!file) messages = { id: 1 };
            else messages = JSON.parse(file);
        } catch (err) {
            console.log(err);
        }
        return messages;
    }

    async saveFile(newArr, filePath) {
        await fs.promises.writeFile(filePath, JSON.stringify(newArr, null, 2));
    }
}

module.exports = MessageRepository;