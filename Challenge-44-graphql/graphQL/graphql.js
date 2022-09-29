const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const ProductResolver = require('./resolvers/productResolver')

const schema = buildSchema(`
  type Product {
    id: ID!,
    title: String,
    price: Int,
    thumbnail: String
  }

  input ProductInput { 
    title: String,
    price: Int,
    thumbnail: String
  }

  type Query {
    getProduct(id: ID!): Product
    getProducts(field: String, value: String): [Product]
  }

  type Mutation {
    createProduct(values: ProductInput): Product,
    updateProduct(id: ID!, values: ProductInput): Product,
    deleteProduct(id: ID!): Boolean
  }

`)

//input is like a request body
//Mutation --> writing process/operation

const productResolver = new ProductResolver()

module.exports = () => {
  return graphqlHTTP({
    schema, 
    rootValue: {
      getProduct: productResolver.getProduct,
      getProducts: productResolver.getProducts,
      createProduct: productResolver.createProduct,
      updateProduct: productResolver.updateProduct,
      deleteProduct: productResolver.deleteProduct,
    },
    graphiql: true,
  })
}