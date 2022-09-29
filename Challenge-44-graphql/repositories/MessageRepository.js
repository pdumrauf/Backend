const MessageDAOMemory = require("../DAOs/message/MessageDAOMemory");

let instance = null;

class MessageRepository {
    constructor() {
        this.dao = new MessageDAOMemory();
    }

    async saveMessage(message) {
        return await this.dao.saveMessage(message);
    }

    async getAll() {
        return this.dao.getAll();
    }

    static getInstance() {
        if (instance) return instance;

        instance = new UserRepository();
        return instance;
    }
}

module.exports = MessageRepository;