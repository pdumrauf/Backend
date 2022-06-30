const mongoose = require("mongoose");

const URL = "mongodb://127.0.0.1:27017/ecommerce";

module.exports = {
    connection: null,
    connect: () => {
        if (this.connection) return this.connection;
        return mongoose
            .connect(URL, { useUnifiedTopology: true, useNewUrlParser: true })
            .then((connection) => {
                this.connection = connection;
                console.log("Connection success");
            })
            .catch((err) => console.log(err));
    },
};
