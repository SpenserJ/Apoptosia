var Sandbox = require('./sandbox');

var Server = function Server(callback) {
  var self = this;
  this.callback = callback;
  this.sandboxedServer = new Sandbox(require('./serverSandboxAPI'));
  this.sandboxedServer.executeFile('./server/server.js', callback);
};

Server.prototype.trigger = function trigger(event, socket, data) {
  var AP = this.sandboxedServer.scope.AP
    , i;
  if (typeof AP.eventBindings[event] !== 'undefined') {
    var events = AP.eventBindings[event];
    for (i = 0; i < events.length; i++) {
      events[i].call(AP, socket, data);
    }
  } 
};

module.exports = Server;
