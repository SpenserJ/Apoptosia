#!/usr/bin/env node
var Host = require('./host/host')
  , ServerSandbox = require('./host/serverSandbox');

var host = new Host();
var server = new ServerSandbox(function() {
  host.start();
});

server.sandboxedServer.scope.TC.broadcast = function broadcast(event, data) {
  console.log('Broadcasting ' + event, data);
  host.web.io.sockets.emit(event, data);
};

host.web.io.sockets.on('connection', function (socket) {
  server.trigger('connection', socket);

  socket.on('*', function (event) {
    server.trigger(event.name, socket, event.args[0]);
  });
});
