var tcMelonSprites = {};

// Configure the keybindings
me.input.bindKey(me.input.KEY.A, "left", true);
me.input.bindKey(me.input.KEY.D, "right", true);
me.input.bindKey(me.input.KEY.W, "up", true);
me.input.bindKey(me.input.KEY.S, "down", true);

socket.on('game.player.joined', function(data) {
  if (typeof tcMelonSprites[data.username] !== 'undefined') {
    throw 'Duplicate player name!';
  }

  var mode = (data.username === tcKnockout.authentication.username()) ? 'player': 'npc';
  tcMelonSprites[data.username] = me.entityPool.newInstanceOf(mode, 64, 64, data.pokeID);
  console.log(tcMelonSprites);
  me.game.add(tcMelonSprites[data.username], 1001);
  me.game.sort();
});

socket.on('game.player.move', function(data) {
  if (typeof tcMelonSprites[data.username] === 'undefined') {
    throw 'Could not find player ' + data.username;
  }
  tcMelonSprites[data.username].move(data.x, data.y);
});
