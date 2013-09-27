(function () {
  var CharacterManager = function CharacterManager() {
    console.log('TCClient.Renderer.CharacterManager()');
    this.Characters = {};

    tc.Events.on('IO.game.player.joined', [this, this.createCharacter]);
  };

  CharacterManager.prototype.createCharacter = function createCharacter(options) {
    this.Characters[options.id] = new this.CharacterClass(options);
    return this.Characters[options.id];
  };

  CharacterManager.prototype.get = function get(id) {
    return this.Characters[id];
  };

  tc.Renderer.LoadModule(CharacterManager);
}());
