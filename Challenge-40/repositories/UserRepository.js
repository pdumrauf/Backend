const UserDTO = require("../DTOs/UserDTO");
const userDAOFactory = require("../factories/userDAOFactory");
let instance = null;

class UserRepository {
    constructor() {
        this.dao = userDAOFactory(process.env.STORAGE);
    }

    async getById(id) {
        const user = await this.dao.getById(id);
        const usersDTO = new UserDTO(user);
        return usersDTO;
    }

    async getUserByEmail(email) {
        const user = await this.dao.getUserByEmail(email);

        if (user) {
            const userDTO = new UserDTO(user);
            return userDTO;
        }
        return null;
    }

    async createUser(data) {
        const newUser = await this.dao.createUser(data);
        const userDTO = new UserDTO(newUser);
        return userDTO;
    }

    static getInstance() {
        if (instance) {
            return instance;
        }
        instance = new UserRepository();
        return instance;
    }
}

module.exports = UserRepository;