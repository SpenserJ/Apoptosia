var Sandbox = require('./sandbox');

var Server = function Server(callback) {
  var self = this;
  this.callback = callback;
  this.sandboxedServer = new Sandbox(require('./serverSandboxAPI'));
  this.sandboxedServer.executeFile('./server/server.js', callback);
};

Server.prototype.trigger = function trigger(event, socket) {
  var TC = this.sandboxedServer.scope.TC
    , i;
  if (typeof TC.eventBindings[event] !== 'undefined') {
    var events = TC.eventBindings[event];
    for (i = 0; i < events.length; i++) {
      events[i].call(TC, socket);
    }
  } 
};

module.exports = Server;
