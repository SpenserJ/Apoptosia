var game = {
  "onload" : function () {
    if (!me.video.init("screen", 640, 640, true, 'auto')) {
      alert("Your browser does not support HTML5 canvas.");
      return;
    }
  
    if (document.location.hash === "#debug") {
      window.onReady(function () {
        me.plugin.register.defer(debugPanel, "debug");
      });
    }

    me.loader.onload = this.loaded.bind(this);
    me.loader.preload(game.resources);
    me.state.change(me.state.LOADING);
  },

  "loaded" : function () {
    me.state.set(me.state.PLAY, new game.PlayScreen());
    me.sys.gravity = 0;
    me.sys.pauseOnBlur = false;

    me.state.change(me.state.PLAY);
  }
};
