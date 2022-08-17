const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const yargs = require("yargs");
const server = require("./server");

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
    server(args);
}