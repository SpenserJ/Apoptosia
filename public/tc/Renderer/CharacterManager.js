(function () {
  var EntityManager = function EntityManager() {
    console.log('TCClient.Renderer.EntityManager()');
    this.Entities = {};
  };

  EntityManager.prototype.createCharacter = function createCharacter(options) {
    this.Entities.test = me.entityPool.newInstanceOf('npc', 320, 320, 93);
    me.game.add(this.Entities.test, 2);
    me.game.sort();
  };

  tc.Renderer.LoadModule(EntityManager);
}());
