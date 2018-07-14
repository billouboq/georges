"use strict";

const meteoService = require("./meteo");
const { asyncEvery, asyncSome } = require("../helper/async");

module.exports = {
  validateRestrictions,
};

const RESTRICTIONS = {
  DATE: "@date",
  AGE: "@age",
  METEO: "@meteo",
  OR: "@or",
};

const METEO_PARAMS = {
  WEATHER: "is",
  TEMP: "temp",
};

const OP = {
  GREATER_THAN: "gt",
  LESS_THAN: "lt",
  EQUAL: "eq",
};

async function validateRestrictions(restrictions = {}, reqArguments = {}) {
  const isValide = await asyncEvery(Object.keys(restrictions), async key => {
    const restrc = restrictions[key];

    switch (key) {
      case RESTRICTIONS.DATE: {
        return validateDate({
          after: restrc.after,
          before: restrc.before,
        });
      }
      case RESTRICTIONS.AGE: {
        return Object.keys(restrc).every(ageOp => {
          return (
            reqArguments.age &&
            validateNumber({
              number: reqArguments.age,
              op: ageOp,
              opNumber: restrc[ageOp],
            })
          );
        });
      }
      case RESTRICTIONS.METEO: {
        return (
          reqArguments.meteo &&
          (await validateMeteo({
            city: reqArguments.meteo.town,
            params: restrc,
          }))
        );
      }
      case RESTRICTIONS.OR: {
        return await asyncSome(restrc, async singleRestrc => {
          return await validateRestrictions(singleRestrc, reqArguments);
        });
      }
    }
  });

  return isValide;
}

function validateDate({ before = "", after = "" } = {}) {
  const now = Date.now();
  const endDate = new Date(before);
  const startDate = new Date(after);

  return now > startDate && now < endDate;
}

function validateMeteo({ city, params = {} } = {}) {
  const validateMeteoData = data =>
    Object.keys(params).every(key => {
      const paramsData = params[key];

      switch (key) {
        case METEO_PARAMS.WEATHER: {
          return (
            data.weather &&
            data.weather.length &&
            data.weather[0].main.toLowerCase() === paramsData.toLowerCase()
          );
        }
        case METEO_PARAMS.TEMP: {
          if (!data.main || !data.main.temp) {
            return false;
          }

          return Object.keys(paramsData).every(paramsKey =>
            validateNumber({
              number: data.main.temp,
              op: paramsKey,
              opNumber: paramsData[paramsKey],
            })
          );
        }
      }
    });

  return meteoService
    .now({ city })
    .then(validateMeteoData)
    .catch(() => false);
}

function validateNumber({ number, op, opNumber } = {}) {
  switch (op) {
    case OP.GREATER_THAN: {
      return number > opNumber;
    }
    case OP.LESS_THAN: {
      return number < opNumber;
    }
    case OP.EQUAL: {
      return number === opNumber;
    }
  }
}
