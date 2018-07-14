"use strict";

const promocodes = require("../../services/promocodes");

module.exports = async (req, res) => {
  return promocodes.findAll();
};
