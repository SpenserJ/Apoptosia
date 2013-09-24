var web = require('./web');

var Host = function() {
  this.port = 3000;
  this.web = web;
};

Host.prototype.start = function start() {
  web.server.listen(this.port);
  console.log('Host is started on port ' + this.port);
};

module.exports = Host;
