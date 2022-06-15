let knex;

class Products {
  constructor(config, table) {
    this.table = table;
    knex = require("knex")(config);
  }

  async saveProduct(product) {
    try {
      const id = await knex(this.table).insert({
        product: product.title,
        price: Number(product.price),
        thumbnail: product.thumbnail,
      });
      return await knex(this.table).where({ id });
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      return await knex.from(this.table).select("*");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Products;