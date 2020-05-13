const express = require("express");
const helmet = require("helmet");

const carsRouter = require("../cars/carsRouter");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/cars", logger, carsRouter);

server.get("/", (req, res) => {
  res.send(`<h2>This is the message for a general server get request</h2>`);
});

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

module.exports = server;
