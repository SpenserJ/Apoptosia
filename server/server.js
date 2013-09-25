var usernames = [];

TC.on('connection', function (socket) {
  socket.emit('version', { version: '0.0.1' });
});

TC.on('disconnect', function (socket) {
  if (typeof socket.username !== 'undefined' &&
      usernames.indexOf(socket.username) !== -1) {
    usernames.splice(usernames.indexOf(socket.username), 1);
    TC.broadcast('chat.member.left', { username: socket.username });
  }
});

TC.on('login', function (socket, data) {
  if (usernames.indexOf(data.username) !== -1) {
    return socket.emit('login.failed', { error: 'Username already in use' });
  }

  usernames.push(data.username);
  socket.username = data.username;
  socket.pokeID = Math.floor(Math.random() * 155 + 1);
  socket.emit('login.successful');
  TC.broadcast('chat.member.joined', { username: data.username });
  TC.broadcast('game.player.joined', { username: data.username, pokeID: socket.pokeID });
});

TC.on('chat', function (socket, data) {
  TC.broadcast('chat', data);
});

TC.on('game.move', function (socket, data) {
  TC.broadcast('game.player.move', { username: socket.username, x: data.x, y: data.y });
});
