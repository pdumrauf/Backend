const { Router } = require("express");
const { isAuthenticated } = require("../middleware/authenticate");
const AppService = require("../services/AppService");
const AppController = require("../controllers/AppController");

const appService = new AppService();
const appController = new AppController(appService);

const appRouter = new Router();

//appRouter.get("/info", (req, res) => appController.getInfo(req,res));
appRouter.get("/info", appController.getInfo.bind(appController));

appRouter.get("/", isAuthenticated, appController.home);

appRouter.get("*", appController.notFound);

module.exports = appRouter;