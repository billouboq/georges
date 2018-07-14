"use strict";

const boom = require("boom");
const promocodes = require("../../services/promocodes");

module.exports = async (req, res) => {
  try {
    return await promocodes.create(req.body);
  } catch (err) {
    throw boom.badRequest();
  }
};
