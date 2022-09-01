const bCrypt = require("bcrypt");

const hashedPassword = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

const verifyPassword = (password, user) => {
    return bCrypt.compareSync(password, user.password);
};

module.exports = { hashedPassword, verifyPassword };