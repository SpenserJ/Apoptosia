TC.on('connection', function (socket) {
  console.log('Received new connection');
  socket.emit('version', { version: '0.0.1' });
  TC.broadcast('newMember', { name: 'unknown' });
  socket.emit('chat', { username: 'Spenser', message: 'Hello World!' });
});

TC.on('chat', function (data) {
  TC.broadcast('chat', data);
});
