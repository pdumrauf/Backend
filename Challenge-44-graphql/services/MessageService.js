const logger = require("../src/logs");
const MessageRepository = require("../repositories/MessageRepository");


class MessageService {
    constructor() {
        this.repository = new MessageRepository();
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