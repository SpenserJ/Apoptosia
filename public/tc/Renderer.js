(function () {
  var Renderer = function Renderer() {
    console.log('TCClient.Renderer()');
    this.Entity = {};

    tc.Events.on('ready', [this, this.initialize]);
  };

  Renderer.prototype.loaded = function loaded() {
    var self = this;

    tc.Events.trigger('Renderer.loaded');
    self.engine.state.set(self.engine.state.PLAY, new self.PlayScreen());
    self.engine.sys.gravity = 0;
    self.engine.sys.pauseOnBlur = false;

    self.engine.state.change(self.engine.state.PLAY);
  };
  
  Renderer.prototype.initialize = function initialize() {
    var self = this;

    self.engine = me;
    if (self.engine.video.init("screen", 640, 640, true, 'auto') === false) {
      alert("Your browser does not support HTML5 canvas.");
      return;
    }

    if (document.location.hash === "#debug") {
      window.onReady(function () {
        self.engine.plugin.register.defer(debugPanel, "debug");
      });
    }

    self.engine.loader.onload = self.loaded.bind(self);

    self.engine.loader.preload(self.resources);
    self.engine.state.change(self.engine.state.LOADING);
  };

  Renderer.prototype.PlayScreen = me.ScreenObject.extend({
    onResetEvent: function() {
      var self = tc.Renderer;
      self.engine.levelDirector.loadLevel("area01");
      self.engine.entityPool.add("player", self.Entity.Player);
      self.engine.entityPool.add("npc", self.Entity.Pokemon);
    },
    
    onDestroyEvent: function() {
    }
  });

  Renderer.prototype.resources = [
    { name: "tileset-shinygold", type:"image", src: "rendering/data/img/map/area01_level_tiles.png" },
    { name: "pokemon", type: "image", src: "rendering/data/img/sprite/pokemon.png" },
    { name: "area01", type: "tmx", src: "rendering/data/map/area01.tmx" },
    { name: "metatiles16x16", type: "image", src: "rendering/data/img/map/metatiles16x16.png" },
  ];

  Renderer.prototype.loadEntityType = function loadEntityType(name, entity) {
    this.Entity[name] = entity;
  };

  tc.LoadModule(Renderer);
}());
