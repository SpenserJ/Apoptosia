var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , socketioWildcard = require('socket.io-wildcard')
  , io = socketioWildcard(require('socket.io')).listen(server, { log: false });

app.use(express.static('public'));

module.exports.app = app;
module.exports.server = server;
module.exports.io = io;
