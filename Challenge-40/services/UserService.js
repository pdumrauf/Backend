const UserRepository = require("../repositories/UserRepository");

class UserService {
    constructor() {
        this.userRepository = UserRepository.getInstance();
    }

    async getById(id) {
        const user = this.userRepository.getById(id);
        return user;
    }

    async getUserByEmail(email) {
        const datos = await this.userRepository.getUserByEmail(email);
        return datos;
    }
    async createUser(data) {
        const newUser = await this.userRepository.createUser(data);
        return newUser;
    }
}

module.exports = UserService;