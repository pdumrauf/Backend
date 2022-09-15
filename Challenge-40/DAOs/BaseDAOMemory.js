const fs = require("fs");

class BaseDAOMemory {
    constructor(path) {
        this.filePath = path;
    }
    async saveFile(newArr) {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(newArr, null, 2));
        } catch (err) {
            console.log(err);
        }
    }

    async readFile() {
        try {
            const file = await fs.promises.readFile(this.filePath, "utf-8");
            if (!file) return [];
            else return JSON.parse(file);
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = BaseDAOMemory;