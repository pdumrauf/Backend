const yargs = require("yargs");
const numCPUs = require("os").cpus().length;

class AppService {
    async getInfo() {
        const args = yargs(process.argv.slice(2))
            .default({
                port: 8080,
                mode: "fork",
            })
            .alias({
                port: "p",
                mode: "m",
            }).argv;

        const data = {
            args: JSON.stringify(args, null, 2),
            os: process.platform,
            nodeVersion: process.version,
            path: process.execPath,
            processId: process.pid,
            folderPath: process.cwd(),
            maxRSS: process.resourceUsage().maxRSS + " bytes",
            numCPUs,
        };
        return data;
    }
}

module.exports = AppService;