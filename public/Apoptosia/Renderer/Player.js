(function () {
  var Player = ap.Renderer.CharacterManager.CharacterClass.extend({
    construct: function construct(options) {
      ap.Input.bindKey(ap.Input.Keys.W, [this, this.keyMovement]);
      ap.Input.bindKey(ap.Input.Keys.S, [this, this.keyMovement]);
      ap.Input.bindKey(ap.Input.Keys.A, [this, this.keyMovement]);
      ap.Input.bindKey(ap.Input.Keys.D, [this, this.keyMovement]);
    },

    keyMovement: function (bindType, key) {
      if (bindType === 'keyup') {
        if (this.entity.destination.length > 1) {
          this.entity.destination.slice(0, 1);
        }
      } else if (bindType !== 'keydown') { return; }
      var direction;
      switch (key) {
        case ap.Input.Keys.W: direction = 'up';    break;
        case ap.Input.Keys.S: direction = 'down';  break;
        case ap.Input.Keys.A: direction = 'left';  break;
        case ap.Input.Keys.D: direction = 'right'; break;
        default: return;
      }
      this.move(direction);
    },

    move: function move(_super, direction) {
      if (this.entity.destination.length > 2) { return; }
      _super.call(this, direction);
      ap.IO.emit('game.player.move', this.pos);
    },
  });

  ap.Renderer.CharacterManager.PlayerClass = Player;
}());
