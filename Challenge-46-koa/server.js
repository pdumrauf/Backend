const Koa = require("koa");
const koaBody = require("koa-body");

const productsRouter = require("./products");

const app = new Koa();

app.use(koaBody());

app.use(productsRouter.routes());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
  console.log(`Koa server running on port ${PORT}`)
);