"use strict";

const boom = require("boom");
const promocodes = require("../../services/promocodes");
const { validateRestrictions } = require("../../services/validators");
const { asyncFilter } = require("../../helper/async");

module.exports = async (req, res) => {
  const codes = await promocodes.findByName(req.body.promocode_name);

  if (!codes.length) {
    return boom.notFound();
  }

  const filteredPromoCodes = asyncFilter(codes, async code => {
    return (
      !code.restrictions ||
      (await validateRestrictions(code.restrictions, req.body.arguments))
    );
  });

  return filteredPromoCodes;
};
