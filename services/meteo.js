"use strict";

const config = require("config");
const axios = require("axios");

const API_KEY = config.get("openweather.apiKey");
const API_URL = config.get("openweather.apiUrl");

module.exports = {
  now,
};

function now({ city = "" } = {}) {
  return axios
    .request({
      url: API_URL + "weather",
      params: {
        APPID: API_KEY,
        units: "metric",
        q: city,
      },
    })
    .then(result => result.data);
}
