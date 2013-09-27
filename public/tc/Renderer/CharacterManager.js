(function () {
  var CharacterManager = function CharacterManager() {
    console.log('TCClient.Renderer.CharacterManager()');
    this.Characters = {};

    tc.Events.on('IO.game.player.joined', [this, this.createCharacter]);
    tc.Events.on('IO.game.player.left', [this, this.removeCharacter]);
  };

  CharacterManager.prototype.createCharacter = function createCharacter(options) {
    if (options.username === tc.Authentication.username) {
      options.player = true;
    }
    this.Characters[options.id] = new this.CharacterClass(options);
    return this.Characters[options.id];
  };

  CharacterManager.prototype.removeCharacter = function removeCharacter(options) {
    this.Characters[options.id].hide();
    delete this.Characters[options.id];
  };

  CharacterManager.prototype.get = function get(id) {
    return this.Characters[id];
  };

  tc.Renderer.LoadModule(CharacterManager);
}());
