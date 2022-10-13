const Router = require("koa-router");
const router = new Router({
  prefix: "/products",
});

const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 40},
  { id: 4, name: "Product 4", price: 50},
  { id: 5, name: "Product 5", price: 60},
  { id: 6, name: "Product 6", price: 70},
];

router.get("/", (ctx) => {
  ctx.body = products;
});

router.get("/:id", (ctx) => {
  const id = +ctx.params.id;
  const product = product.find((b) => b.id === id);

  if (!product) {
    ctx.response.status = 404;
    ctx.body = {
      error: "Product not found",
    };

    return;
  }

  ctx.body = product;
});

router.post("/", (ctx) => {
  const newProduct = {
    id: products.length + 1,
    name: ctx.request.body.name,
    price: ctx.request.body.price,
  };

  products.push(newProduct);

  ctx.response.status = 201;
  ctx.body = newProduct;
});

router.put("/:id", (ctx) => {
  const id = +ctx.params.id;

  const product = product.find((b) => b.id === id);

  if (!product) {
    ctx.response.status = 404;
    ctx.body = {
      error: "Product not found",
    };

    return;
  }

  product.name = ctx.request.body.name || product.name;
  product.price = ctx.request.body.price || product.price;

  ctx.body = product;

});

router.delete("/:id", (ctx) => {
  const id = +ctx.params.id;

  const productIndex = products.findIndex((b) => b.id === id);

  if (productIndex === -1) {
    ctx.response.status = 404;
    ctx.body = {
      error: "Product not found",
    };

    return;
  }

  products.splice(productIndex, 1);

  ctx.response.status = 204;
});

module.exports = router;