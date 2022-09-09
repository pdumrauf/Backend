//const userServices = require("../repositories/UserRepository");

class UserService {
    constructor(model) {
        this.model = model;
    }
    async getUserByEmail(email) {
        const datos = await this.model.getUserByEmail(email);
        return datos;
    }
    async createUser(data) {
        const newUser = await this.model.createUser(data);
        return newUser;
    }
}

module.exports = UserService;