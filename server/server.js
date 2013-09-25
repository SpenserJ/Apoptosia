var players = {};

TC.on('connection', function (socket) {
  socket.emit('version', { version: '0.0.1' });
  var keys = Object.keys(players), i;
  for (i = 0; i < keys.length; i++) {
    var sendPlayer = players[keys[i]];
    socket.emit('game.player.joined', {
      username: sendPlayer.username,
      pokeID: sendPlayer.pokeID,
      x: sendPlayer.x,
      y: sendPlayer.y 
    });
  }
});

TC.on('disconnect', function (socket) {
  if (typeof socket.username !== 'undefined' &&
      typeof players[socket.username] !== 'undefined') {
    delete players[socket.username];
    TC.broadcast('chat.member.left', { username: socket.username });
    TC.broadcast('game.player.left', { username: socket.username });
  }
});

TC.on('login', function (socket, data) {
  if (typeof players[data.username] !== 'undefined') {
    return socket.emit('login.failed', { error: 'Username already in use' });
  }

  socket.username = data.username;
  socket.pokeID = Math.floor(Math.random() * 155 + 1);
  socket.x = 64;
  socket.y = 64;
  players[socket.username] = socket;
  socket.emit('login.successful');
  TC.broadcast('chat.member.joined', { username: socket.username });
  TC.broadcast('game.player.joined', { username: socket.username, pokeID: socket.pokeID, x: 64, y: 64 });
});

TC.on('chat', function (socket, data) {
  TC.broadcast('chat', data);
});

TC.on('game.move', function (socket, data) {
  socket.x = data.x;
  socket.y = data.y;
  TC.broadcast('game.player.move', { username: socket.username, x: socket.x, y: data.y });
});
