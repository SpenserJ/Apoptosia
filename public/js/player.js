var tcMelonSprites = {}, tcMelonSpritesToLoad = [];
var tcMelonLoaded = false;

// Configure the keybindings
me.input.bindKey(me.input.KEY.A, "left", true);
me.input.bindKey(me.input.KEY.D, "right", true);
me.input.bindKey(me.input.KEY.W, "up", true);
me.input.bindKey(me.input.KEY.S, "down", true);

me.event.subscribe(me.event.LOADER_COMPLETE, function(){
  setTimeout(checkForMelonEntityReady, 1000);
});

function checkForMelonEntityReady() {
  if (typeof me.game.PlayerEntity === 'false') {
    return setTimeout(checkForMelonEntityReady, 1000);
  }
  tcMelonLoaded = true;
  var loadedSprites = false;
  while (tcMelonSpritesToLoad.length > 0) {
    var spriteData = tcMelonSpritesToLoad.shift();
    tcMelonSprites[spriteData.username] =
      me.entityPool.newInstanceOf('npc', spriteData.x, spriteData.y, spriteData.pokeID);
    me.game.add(tcMelonSprites[spriteData.username], 1001);
    loadedSprites = true;
  }
  if (loadedSprites === true) {
    me.game.sort();
  }
}

socket.on('game.player.joined', function(data) {
  if (typeof tcMelonSprites[data.username] !== 'undefined' ||
      typeof tcMelonSpritesToLoad[data.username] !== 'undefined') {
    throw 'Duplicate player name!';
  }

  if (tcMelonLoaded === false) {
    return tcMelonSpritesToLoad.push(data);
  }
  var mode = (data.username === tcKnockout.authentication.username()) ? 'player': 'npc';
  tcMelonSprites[data.username] = me.entityPool.newInstanceOf(mode, 64, 64, data.pokeID);
  me.game.add(tcMelonSprites[data.username], 1001);
  me.game.sort();
});

socket.on('game.player.left', function(data) {
  if (typeof tcMelonSprites[data.username] !== 'undefined') {
    me.game.remove(tcMelonSprites[data.username]);
    delete tcMelonSprites[data.username];
  } else if (typeof tcMelonSpritesToLoad[data.username] !== 'undefined') {
    me.game.remove(tcMelonSpritesToLoad[data.username]);
    delete tcMelonSpritesToLoad[data.username];
  }
  me.game.sort();
});

socket.on('game.player.move', function(data) {
  if (typeof tcMelonSprites[data.username] === 'undefined') {
    throw 'Could not find player ' + data.username;
  }
  tcMelonSprites[data.username].move(data.x, data.y);
});
