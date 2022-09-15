const UserDAOMongo = require("../DAOs/user/UserDAOMongo");
//const UserDAOMemory = require("../DAOs/user/UserDAOMemory");

const storageMapper = {
    memory: () => new UserDAOMemory(),
    mongo: () => new UserDAOMongo(),
};

module.exports = (storage) => {
    const storageDAOFn = storageMapper[storage] || storageMapper.mongo;
    const dao = storageDAOFn();
    return dao;
};
