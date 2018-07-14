"use strict";

module.exports = {
  asyncEvery,
  asyncSome,
  asyncFilter,
};

async function asyncEvery(array, callback) {
  for (let index = 0; index < array.length; index++) {
    if ((await callback(array[index], index, array)) === false) {
      return false;
    }
  }

  return true;
}

async function asyncSome(array, callback) {
  for (let index = 0; index < array.length; index++) {
    if ((await callback(array[index], index, array)) === true) {
      return true;
    }
  }

  return false;
}

async function asyncFilter(array, callback) {
  const newArray = [];

  for (let index = 0; index < array.length; index++) {
    if ((await callback(array[index], index, array)) === true) {
      newArray.push(array[index]);
    }
  }

  return newArray;
}
