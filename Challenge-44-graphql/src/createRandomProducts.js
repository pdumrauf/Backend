const { faker } = require("@faker-js/faker");

const createRandomProducts = (n) => {
    let products = [];
    for (let i = 0; i < n; i++) {
        products.push({
            id: i + 1,
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.animals(640, 480, true),
        });
    }
    return products;
};

module.exports = createRandomProducts;