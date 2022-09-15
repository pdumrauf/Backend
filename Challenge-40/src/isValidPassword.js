const bCrypt = require("bcrypt");

const createHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

const verifyPassword = (password, user) => {
    return bCrypt.compareSync(password, user.password);
};

module.exports = { createHash, verifyPassword };