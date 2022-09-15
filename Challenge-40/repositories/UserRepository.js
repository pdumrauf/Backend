const { createHash } = require("../src/isValidPassword");

class UserRepository {
    constructor(model) {
        this.model = model;
    }

    async getUserByEmail(email) {
        return await this.model.findOne({ email });
    }

    async createUser(data) {
        const newUser = new this.model({
            email: data.email,
            password: createHash(data.password),
        });
        console.log(newUser)
        return await newUser.save();
    }
}

module.exports = UserRepository;