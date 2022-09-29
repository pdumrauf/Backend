const ProductService = require('../../services/ProductService')

class ProductResolver {
  constructor() {
    this.service = new ProductService()
  }

  getProduct = async ({ id }) => {
    const info = await this.service.getOne(id)
    return info
  }

  getProducts = async ({ field, value }) => {
    const info = await this.service.getAll()
    if( field && value ) return info.filter(prod => prod[field] == value)
    return info
  }

  createProduct = async ({ values }) => {
    const data = await this.service.createProduct(values)
    return data
  }

  updateProduct = async ({ id, value }) => {
    const data = await this.service.updateProduct(id, values)
    return data
  }

  deleteProduct = async ({ id }) => {
    return await this.service.deleteProduct(id)
  }
}

module.exports = ProductResolver