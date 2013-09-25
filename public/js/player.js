var tcMelonSprites = {};

socket.on('game.player.joined', function(data) {
  if (typeof tcMelonSprites[data.username] !== 'undefined') {
    throw 'Duplicate player name!';
  }

  var mode = (data.username === tcKnockout.authentication.username()) ? 'player': 'npc';
  tcMelonSprites[data.username] = me.entityPool.newInstanceOf(mode, 64, 64, data.pokeID);
  me.game.add(tcMelonSprites[data.username], 1001);
  me.game.sort();
});

socket.on('game.player.move', function(data) {
  if (typeof tcMelonSprites[data.username] === 'undefined') {
    throw 'Could not find player ' + data.username;
  }
  if (data.username === tcKnockout.authentication.username()) {
    return;
  }

  console.log(data.username + ' is at ' + data.x + ',' + data.y);
  tcMelonSprites[data.username].pos.x = data.x;
  tcMelonSprites[data.username].pos.y = data.y;
  tcMelonSprites[data.username].update();
});
