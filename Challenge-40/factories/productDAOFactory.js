const ProductDAOMongo = require("../DAOs/user/ProductDAOMongo");
const ProductDAOMemory = require("../DAOs/product/ProductDAOMemory");

const storageMapper = {
    memory: () => new ProductDAOMemory(),
    mongo: () => new ProductDAOMongo(),
};

module.exports = (storage) => {
    const storageDAOFn = storageMapper[storage] || storageMapper.memory;
    const dao = storageDAOFn();
    return dao;
};