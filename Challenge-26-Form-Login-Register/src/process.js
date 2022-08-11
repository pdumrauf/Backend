const yargs = require("yargs");
const argv = yargs(process.argv.slice(2))
  .default({
    port: 8080,
    mode: "fork",
  })
  .alias({
    port: "p",
    mode: "m",
  }).argv;

module.exports = argv;