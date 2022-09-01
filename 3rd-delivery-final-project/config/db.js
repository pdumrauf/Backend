const mongoose = require("mongoose");
const logger = require("../src/logs");

const connectDB = async (URL) => {
    try {
        await mongoose.connect(URL);
        console.log("Connected to MongoDB");
    } catch (e) {
        logger.error(e)
    }
};

module.exports = connectDB;