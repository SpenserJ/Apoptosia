var players = {};

AP.on('connection', function (socket) {
  socket.emit('version', { version: '0.0.1' });
  var keys = Object.keys(players), i;
  for (i = 0; i < keys.length; i++) {
    var sendPlayer = players[keys[i]];
    console.log(sendPlayer);
    socket.emit('game.player.joined', {
      username: sendPlayer.username,
      pokeID: sendPlayer.pokeID,
      x: sendPlayer.x,
      y: sendPlayer.y,
      id: sendPlayer.id
    });
  }
});

AP.on('disconnect', function (socket) {
  if (typeof socket.username !== 'undefined' &&
      typeof players[socket.username] !== 'undefined') {
    delete players[socket.username];
    AP.broadcast('chat.member.left', { username: socket.username, id: socket.id });
    AP.broadcast('game.player.left', { username: socket.username, id: socket.id });
  }
});

AP.on('login', function (socket, data) {
  if (typeof players[data.username] !== 'undefined') {
    return socket.emit('login.failed', { error: 'Username already in use' });
  }

  socket.username = data.username;
  socket.pokeID = Math.floor(Math.random() * 155 + 1);
  socket.x = Math.floor(Math.random() * 35) + 2;
  socket.y = Math.floor(Math.random() * 36 + 1) + 2;
  socket.id = socket.username;
  players[socket.username] = socket;
  socket.emit('login.successful', { id: socket.id });
  AP.broadcast('chat.member.joined', { username: socket.username, id: socket.id });
  AP.broadcast('game.player.joined', { username: socket.username, pokeID: socket.pokeID, x: socket.x, y: socket.y, id: socket.id });
});

AP.on('chat', function (socket, data) {
  AP.broadcast('chat', data);
});

AP.on('game.player.move', function (socket, data) {
  socket.x = data.x;
  socket.y = data.y;
  AP.broadcast('game.player.move', {
    username: socket.username,
    x: socket.x,
    y: socket.y,
    id: socket.id
  });
});
