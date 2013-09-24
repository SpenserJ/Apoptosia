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

var socketLookup = {};

host.web.io.sockets.on('connection', function (rawSocket) {
  if (typeof socketLookup[rawSocket.id] === 'undefined') {
    socketLookup[rawSocket.id] = {
      emit: function(name, data) {
        rawSocket.emit(name, data);
      }
    };
  }
  var socket = socketLookup[rawSocket.id];
  server.trigger('connection', socket);

  rawSocket.on('disconnect', function() {
    server.trigger('disconnect', socket);
  });

  rawSocket.on('*', function (event) {
    server.trigger(event.name, socket, event.args[0]);
  });
});
