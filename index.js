"use strict";

const fastify = require("fastify");
const mongoose = require("mongoose");
const config = require("config");

const initRoutes = require("./routes");
const initMiddlewares = require("./middlewares");

const server = fastify();

const PORT = config.get("server.port");
const MONGODB_URL = config.get("mongodb.url");

initMiddlewares(server);
initRoutes(server);

async function start() {
  try {
    await mongoose.connect(
      MONGODB_URL,
      { useNewUrlParser: true }
    );
    await server.listen(PORT);

    console.log(`server starting on port ${PORT}`);
  } catch (err) {
    console.error("Error starting server");
    throw err;
  }
}

start();
