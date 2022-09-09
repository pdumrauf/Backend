const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { engine } = require("express-handlebars");

const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const initializePassport = require("./config/passport");

const dotenv = require("dotenv");
const compression = require("compression");

const connectDB = require("./config/db");
const logger = require("./src/logs");

const normalizeMessages = require("./src/normalizeMessages");

const MessageService = require("./services/MessageService");
const ProductService = require("./services/ProductService");
const MessageRepository = require("./repositories/MessageRepository");
const ProductRepository = require("./repositories/ProductRepository");

//const randomRouter = require("./routes/randomRouter");
const appRouter = require("./routes/appRouter");
const authRouter = require("./routes/authRouter");
const productRouter = require("./routes/productRouter");

const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const yargs = require("yargs");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

dotenv.config();
connectDB(process.env.MONGODB_URI);
initializePassport(passport);

const messageRepository = new MessageRepository("messages");
const productRepository = new ProductRepository("products");

const productService = new ProductService(productRepository);
const messageService = new MessageService(messageRepository);

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
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static("./public"));

app.use(compression());
//app.use("/api", randomRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/", appRouter);

app.use((req, res, next) => {
    logger.info(`Route: ${req.path} Method: ${req.method}`);
    return next();
});

const PORT = process.env.PORT || 8080;

const args = yargs(process.argv.slice(2))
    .default({
        port: 8080,
        mode: "fork",
    })
    .alias({
        port: "p",
        mode: "m",
    }).argv;

if (args.mode === "cluster" && cluster.isPrimary) {
    console.log(`Primary process: ${process.pid}`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
        console.log({ code });
        console.log(`worker ${worker.process.pid} died`);
        if (!code) {
            cluster.fork();
        }
    });
} else {
    console.log(`${args.mode === "cluster" ? "Worker" : "Primary"} process: ${process.pid}`);
}

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

app.get("*", (req, res) => {
    logger.warn(`Ruote: ${req.path} Method: ${req.method}`);
    return res.status(404).json({ message: "page not found" });
});

io.on("connection", async (socket) => {
    console.log(`new user id: ${socket.id}`);

    socket.on("addProduct", async (data) => {
        console.log(data);
        const newProduct = await productService.createProduct(data);
        console.log(newProduct);
        io.emit("newProduct", newProduct);
    });

    //chat
    socket.on("login", async () => {
        const messages = await messageService.getAll();
        normalizeMessages(messages);
        socket.emit("success", normalizeMessages(messages));
    });

    socket.on("addMessage", async (data) => {
        const newMessage = await messageService.createMessage(data);
        io.emit("newMessage", newMessage);
    });
});

httpServer.listen(PORT, () => console.log(`Server listening on port ${PORT}`));



