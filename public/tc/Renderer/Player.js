(function () {
  var Player = tc.Renderer.CharacterManager.CharacterClass.extend({
    construct: function construct(options) {
      tc.Input.bindKey(tc.Input.Keys.W, [this, this.keyMovement]);
      tc.Input.bindKey(tc.Input.Keys.S, [this, this.keyMovement]);
      tc.Input.bindKey(tc.Input.Keys.A, [this, this.keyMovement]);
      tc.Input.bindKey(tc.Input.Keys.D, [this, this.keyMovement]);
    },

    keyMovement: function (bindType, action, key) {
      if (action === 'up') {
        if (this.entity.destination.length > 1) {
          this.entity.destination.slice(0, 1);
        }
      } else if (action !== 'down') { return; }
      var direction;
      switch (key) {
        case tc.Input.Keys.W: direction = 'up';    break;
        case tc.Input.Keys.S: direction = 'down';  break;
        case tc.Input.Keys.A: direction = 'left';  break;
        case tc.Input.Keys.D: direction = 'right'; break;
        default: return;
      }
      this.move(direction);
    },

    move: function move(_super, direction) {
      if (this.entity.destination.length > 2) { return; }
      _super.call(this, direction);
      tc.IO.emit('game.player.move', this.pos);
    },
  });

  tc.Renderer.CharacterManager.PlayerClass = Player;
}());
