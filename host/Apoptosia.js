var APServer = function APServer() {
  this.eventBindings = {};
};

APServer.prototype.on = function on(event, callback) {
  console.log('Binding to ' + event);
  if (typeof this.eventBindings[event] === 'undefined') {
    this.eventBindings[event] = [];
  }
  this.eventBindings[event].push(callback);
};

module.exports.Server = APServer;
