const express = require("express");
const app = express();
const productsRouter = require("./routers/productsRouter");
const cartRouter = require("./routers/cartRouter");

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartRouter);


const server = app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});

server.on("error", (err) => console.log(err));
