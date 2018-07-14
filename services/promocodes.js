"use strict";

const Promocodes = require("../schemas/promocodes");

module.exports = {
  create,
  findAll,
  findByName,
};

function create(reductionData = {}) {
  return Promocodes.create(reductionData);
}

function findAll(query = {}) {
  return Promocodes.find(query);
}

function findByName(name) {
  return Promocodes.find({ name });
}
