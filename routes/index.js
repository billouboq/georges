"use strict";

const ask = require("./promocodes/ask");
const get = require("./promocodes/get");
const create = require("./promocodes/create");

module.exports = server => {
  server.get("/promocodes", get);
  server.post("/promocodes", {}, create);
  server.post("/promocodes/ask", {}, ask);
};
