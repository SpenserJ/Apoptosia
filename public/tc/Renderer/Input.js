(function () {
  var Input = function Input() {
    console.log('TCClient.Input()');
    this.bindings = { key: {}, mouse: {} };
    this.Keys = me.input.KEY;
    tc.Events.on('ready', [this, this.initialize]);
  };

  Input.prototype.initialize = function initialize() {
    var self = this;
    tc.Renderer.engine.event.subscribe(tc.Renderer.engine.event.KEYDOWN, function(input) {
      self.inputCallback('key', 'down', input);
    });
    tc.Renderer.engine.event.subscribe(tc.Renderer.engine.event.KEYUP, function(input) {
      self.inputCallback('key', 'up', input);
    });
  };

  Input.prototype.bindKey = function bindKey(key, callback) {
    if (typeof this.bindings.key[key] === 'undefined') {
      tc.Renderer.engine.input.bindKey(key, key);
    }
    if (typeof this.bindings.key[key] === 'undefined') {
      this.bindings.key[key] = [];
    }
    if (typeof callback === 'function') {
      callback = [null, callback];
    }
    this.bindings.key[key].push(callback);
  };

  Input.prototype.inputCallback = function inputCallback(type, action, input) {
    if (typeof this.bindings[type] === 'undefined' ||
        typeof this.bindings[type][input] === 'undefined') {
      return;
    }
    var i;
    for (i = 0; i < this.bindings[type][input].length; i++) {
      var callback = this.bindings[type][input][i];
      callback[1].call(callback[0], type, action, input);
    }
  };

  tc.LoadModule(Input);
}());
