"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promocodeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  avantage: {
    percent: {
      type: Number,
      required: true,
    },
  },
  restrictions: {},
});

module.exports = mongoose.model("Promocode", promocodeSchema);
