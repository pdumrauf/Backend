const fs = require("fs");

const replace = async (name) => {
    const data = await fs.promises.readFile( __dirname + "/../public/main.html", "utf-8");
    const newData = data.replace("nameReplaced", name);
    return newData;
};

module.exports = replace;