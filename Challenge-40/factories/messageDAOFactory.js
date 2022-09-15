//const MessageDAOMongo = require("../DAOs/user/MessageDAOMongo");
const MessageDAOMemory = require("../DAOs/message/MessageDAOMemory");

const storageMapper = {
    memory: () => new MessageDAOMemory(),
    //mongo: () => new MessageDAOMongo(),
};

module.exports = (storage) => {
    //const storageDAOFn = storageMapper[storage] || storageMapper.memory;
    const storageDAOFn = storageMapper.memory;

    const dao = storageDAOFn();
    return dao;
};