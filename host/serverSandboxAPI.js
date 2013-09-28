var Apoptosia = require('./Apoptosia');

module.exports = {
  console: console,

  AP: new Apoptosia.Server()
};
