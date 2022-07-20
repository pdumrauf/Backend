const fs = require("fs");

const replace = async (username) => {
    const data = await fs.promises.readFile(
        __dirname + "/../public/index.html", "utf-8"
    );
    const newData = data.replace("userName", username);
    return newData;
};

module.exports = replace;