const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} ${code} died`);
  });
} else {
  const express = require("express");
  const app = express();
  const port = 3006;

  app.get("/", (req, res) => {
    res.send(`Hello from worker ${process.pid}`);
  });

  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`Worker -> ${process.pid} is listening on port ${port}`);
  });
}

cluster.on("exit", (worker, code, signal) => {
  console.error(
    `Worker ${worker.process.pid} died with code ${code} and signal ${signal}`
  );
  cluster.fork();
});
