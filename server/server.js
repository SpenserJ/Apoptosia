TC.on('connection', function (socket) {
  socket.emit('version', { version: '0.0.1' });
});

TC.on('login', function (socket, data) {
  socket.emit('login.successful');
  TC.broadcast('chat.member.joined', { username: data.username });
});

TC.on('chat', function (socket, data) {
  TC.broadcast('chat', data);
});
