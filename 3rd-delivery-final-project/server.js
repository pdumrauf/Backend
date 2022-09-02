const express = require("express");
const app = express();
const productsRouter = require("./routers/productsRouter");
const cartRouter = require("./routers/cartRouter");
const authRouter = require("./routers/authRouter");
const apiRouter = require("./routers/apiRouter");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const { engine } = require("express-handlebars");
const initializePassport = require("./config/passport");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const middleware404 = require("./middleware/middleware404");

dotenv.config();
const PORT = process.env.PORT || 8080;
connectDB(process.env.MONGODB_URI)

if (process.env.STORAGE === "mongodb") Database.connect();
app.use(express.static("./public/uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 10,
    },
  })
);

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.engine(
  "hbs",
  engine({
      extname: ".hbs",
      defaultLayout: `${__dirname}/views/index.hbs`,
      layoutsDir: `${__dirname}/views/layouts`,
      partialsDir: `${__dirname}/views/partials`,
  })
);
app.set("views", "./views");
app.set("view engine", "hbs");

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/auth", authRouter);
app.use("/", apiRouter);

app.use(middleware404);

const server = app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});

server.on("error", (err) => console.log(err));
