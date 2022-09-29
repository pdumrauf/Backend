const userModel = require("../../models/User");
const { createHash } = require("../../src/isValidPassword");

class UserDAOMongo {
    constructor() {
        this.userModel = userModel;
    }

    async getById(_id) {
        return await this.userModel.findOne({ _id });
    }

    async getUserByEmail(email) {
        return await this.userModel.findOne({ email });
    }

    async createUser(data) {
        const newUser = new this.userModel({
            email: data.email,
            password: createHash(data.password),
        });

        return await newUser.save();
    }
}

module.exports = UserDAOMongo;