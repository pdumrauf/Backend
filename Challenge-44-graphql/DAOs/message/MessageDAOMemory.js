const BaseDAOMemory = require("../BaseDAOMemory");
const path = `${process.cwd()}/json/messages.json`;

class MessageDAOMemory extends BaseDAOMemory {
    constructor() {
        super(path);
    }

    async saveMessage(message) {
        let file = await this.getAll();
        file.messages.push(message);
        await this.saveFile(file);
        return message.id;
    }

    async getAll() {
        let messages = this.readFile();
        return messages;
    }
}

module.exports = MessageDAOMemory;