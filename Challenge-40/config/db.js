const mongoose = require("mongoose");

const connectDB = async (URL) => {
    try {
        await mongoose.connect(URL);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectDB;