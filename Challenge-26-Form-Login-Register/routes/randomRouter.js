const express = require("express");
const router = express.Router();
const { fork } = require("child_process");
const argv = require("../src/process.js");
const cluster = require("cluster");
cluster.schedulingPolicy = cluster.SCHED_RR;

router.get("/", async (req, res) => {
  const repetitions = req.query.cant || 100000000;

  if (argv.mode !== "cluster") {
    const numbersFork = fork("./src/getRandomObject.js");
    numbersFork.on("message", (result) => {
      return res.status(200).send(result);
    });
    numbersFork.send(repetitions);
  } else {
    let { generateRandoms } = require("../src/getRandomObject.js");
    const result = generateRandoms(repetitions);

    return res.status(200).send(result);
  }
});

module.exports = router;