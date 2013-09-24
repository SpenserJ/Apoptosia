var TuringCompete = require('./turingCompete');

module.exports = {
  console: console,

  TC: new TuringCompete.Server()
};
