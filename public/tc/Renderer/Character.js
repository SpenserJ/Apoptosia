(function () {
  var Character = function Character(options) {
    this.entity = me.entityPool.newInstanceOf('npc', 320, 320, 93);
    me.game.add(this.entity, 2);
    me.game.sort();
  };

  tc.Renderer.CharacterManager.CharacterClass = Character;
}());
