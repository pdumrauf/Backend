const logger = require("../src/logs");

class AppController {
    constructor(service) {
        this.service = service;
    }

    async getInfo(_req, res) {
        const data = await this.service.getInfo();
        return res.render("partials/info", { data: data });
    }

    async home(req, res) {
        return res.render("main", { name: req.user.email });
    }

    async notFound(req, res) {
        logger.warn(`Route: ${req.path} Method: ${req.method}`);
        return res.status(404).json({ message: "page not found" });
    }
}

module.exports = AppController;
