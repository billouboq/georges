"use strict";

const compression = require("compression");
const morgan = require("morgan");
const helmet = require("helmet");

module.exports = server => {
  server.use(morgan("dev"));
  server.use(compression());
  server.use(helmet());
};
