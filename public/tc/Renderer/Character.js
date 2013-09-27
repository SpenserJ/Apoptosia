(function () {
  var Character = function Character(options) {
    this.entity = me.entityPool.newInstanceOf('npc', options.x, options.y, options.pokeID);
    this.show();
    if (options.player === true) {
      tc.Input.bindKey(tc.Input.Keys.W, [this, this.moveUp]);
      tc.Input.bindKey(tc.Input.Keys.S, [this, this.moveDown]);
      tc.Input.bindKey(tc.Input.Keys.A, [this, this.moveLeft]);
      tc.Input.bindKey(tc.Input.Keys.D, [this, this.moveRight]);
    }
  };

  Character.prototype.show = function show() {
    me.game.add(this.entity, 2);
    me.game.sort();
  };

  Character.prototype.hide = function hide() {
    me.game.remove(this.entity);
    me.game.sort();
  };

  Character.prototype.moveUp = function moveUp() {
    console.log('Move up');
  };

  Character.prototype.moveDown = function moveDown() {
    console.log('Move down');
  };

  Character.prototype.moveLeft = function moveLeft() {
    console.log('Move left');
  };

  Character.prototype.moveRight = function moveRight() {
    console.log('Move right');
  };

  tc.Renderer.CharacterManager.CharacterClass = Character;
}());
