(function () {
  var CharacterManager = function CharacterManager() {
    console.log('ApoptosiaClient.Renderer.CharacterManager()');
    this.Characters = {};

    ap.Events.on('IO.game.player.joined', [this, this.createCharacter]);
    ap.Events.on('IO.game.player.left', [this, this.removeCharacter]);
    ap.Events.on('IO.game.player.move', [this, this.moveCharacter]);
  };

  CharacterManager.prototype.createCharacter = function createCharacter(options) {
    if (options.username === ap.Authentication.username) {
      this.Characters[options.id] = new this.PlayerClass(options);
    } else {
      this.Characters[options.id] = new this.CharacterClass(options);
    }
    return this.Characters[options.id];
  };

  CharacterManager.prototype.removeCharacter = function removeCharacter(options) {
    this.Characters[options.id].hide();
    delete this.Characters[options.id];
  };

  CharacterManager.prototype.get = function get(id) {
    return this.Characters[id];
  };

  CharacterManager.prototype.moveCharacter = function moveCharacter(data) {
    var character = this.get(data.id);
    if (character instanceof ap.Renderer.CharacterManager.PlayerClass === false) {
      character.updatePosition(data);
    }
  };

  ap.Renderer.LoadModule(CharacterManager);
}());
