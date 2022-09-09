const logger = require("../src/logs");

class MessageService {
    constructor(repository) {
        this.repository = repository;
    }

    async getAll() {
        const data = await this.repository.getAll();
        return data;
    }

    async createMessage(data) {
        const newMessage = {
            text: data.message,
            author: data.user,
            time: new Date(),
        };
        try {
            await this.repository.saveMessage(newMessage);
            return newMessage;
        } catch (err) {
            logger.error(err.message);
        }
    }
}

module.exports = MessageService;