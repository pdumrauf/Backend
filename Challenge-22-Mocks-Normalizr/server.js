const express = require("express")
const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io")
const { engine } = require("express-handlebars")
const Messages = require("./classes/Messages");
const { faker } = require("@faker-js/faker");
const normalizeMessages = require("./normalizeMessages");
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 8080;

app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: `${__dirname}/views/index.hbs`,
        layoutsDir: `${__dirname}/views/layouts`,
        partialsDir: `${__dirname}/views/partials`,
    })
);

app.use(express.static("./public"))

const messagesStore = new Messages();

app.set("views", "./views")
app.set("view engine", "hbs")

const users = []
const products = []

app.get("/products", async (req, res) => {
    return res.send(products);
});

const getRandomProducts = (n) => {
  let products = [];
  for (let i = 0; i < n; i++) {
      products.push({
          id: i + 1,
          title: faker.commerce.product(),
          price: faker.commerce.price(),
          thumbnail: faker.image.avatar(),
      });
  }
  return products;
};

app.get("/api/products-test", (req, res) => {
  const randomProducts = getRandomProducts(5);
  return res.render("index", {
      products: randomProducts,
  })
});
  
  io.on("connection", (socket) => {
    console.log(`nuevo usuario id: ${socket.id}`);
  
    //products
    socket.on("addProduct",  (data) => {
      const newProduct = { ...data, id: products.length + 1 }
      products.push(newProduct);
      io.emit("newProduct", newProduct);
    });
  
    //msg
    socket.on("login", async (user) => {
      users.push({
        user,
        id: socket.id,
      });
      const messages = await messagesStore.getAll();
      normalizeMessages(messages);
      socket.emit("success", normalizeMessages(messages));
    });
  
    socket.on("addMessage", async (data) => {
      const newMessage = {
        text: data.message,
        author: data.user,
        time: new Date(),
    }
  
      await messagesStore.saveMessage(newMessage);
      io.emit("newMessage", newMessage);
    });
  });
  
  httpServer.listen(PORT, () =>
    console.log(`Servidor escuchando en puerto ${PORT}`)
  );
