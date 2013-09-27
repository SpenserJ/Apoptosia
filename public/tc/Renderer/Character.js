(function () {
  var Character = function Character(options) {
    this.entity = me.entityPool.newInstanceOf('npc', 320, 320, options.pokeID);
    this.show();
  };

  Character.prototype.show = function show() {
    me.game.add(this.entity, 2);
    me.game.sort();
  };

  Character.prototype.hide = function hide() {
    me.game.remove(this.entity);
    me.game.sort();
  };

  tc.Renderer.CharacterManager.CharacterClass = Character;
}());
