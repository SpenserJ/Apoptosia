(function () {
  var Player = tc.Renderer.Entity.Pokemon.extend({
    init: function(x, y, pokeID) {
      this.parent(x, y, pokeID);
      me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },

/*    update: function() {
      var distance = this.distanceToPoint(this.destination);
      if (distance > 1) {
        return this.parent();
      }

      if (me.input.isKeyPressed('left')) {
        socket.emit('game.move', { direction: 'left' });
      } else if (me.input.isKeyPressed('right')) {
        socket.emit('game.move', { direction: 'right' });
      } else if (me.input.isKeyPressed('up')) {
        socket.emit('game.move', { direction: 'up' });
      } else if (me.input.isKeyPressed('down')) {
        socket.emit('game.move', { direction: 'down' });
      }
      return this.parent();
    }*/
  });

  tc.Renderer.loadEntityType('Player', Player);
}());
