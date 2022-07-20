const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { engine } = require("express-handlebars");
const Messages = require("./classes/Messages");
const { faker } = require("@faker-js/faker");
const normalizeMessages = require("./src/normalizeMessages");
const replace = require("./src/loginNameReplace");
const session = require('express-session');
const MongoStore = require('connect-mongo');


const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./public"))
app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://pdumrauf:viB5zqDP4jD4ngRl@cluster0.npggbm3.mongodb.net/users?retryWrites=true&w=majority',
    ttl: 600
  }),
  secret: 'qwerty',
  resave: true,
  saveUninitialized: true
}))

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

const messagesStore = new Messages();

app.set("views", "./views")
app.set("view engine", "hbs")

const users = []
const products = []

//login

app.get("/login", (req, res) => {
  res.render("partials/login");
});

app.post("/login", (req, res) => {
  req.session.username = req.body.username;
  res.redirect("/index");
});

app.get("/index", async (req, res) => {
  if (req.session.username) {
      const parsedData = await replace(req.session.username);
      res.send(parsedData);
  } else {
      res.redirect("/logout");
  }
});

app.get("/logout", (req, res) => {
  const username = req.session.username;
  return req.session.destroy((err) => {
      if (!err) {
          return res.render("partials/logout", { username });
      }

      return res.json({ error: err });
  });
});

//products faker

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

//conect to port
  
  httpServer.listen(PORT, () =>
    console.log(`Servidor escuchando en puerto ${PORT}`)
  );
