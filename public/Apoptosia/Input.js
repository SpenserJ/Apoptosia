(function () {
  var Input = function Input() {
    console.log('ApoptosiaClient.Input()');
    this.bindings = { keydown: {}, keyup: {}, mouse: {} };
    this.Keys = me.input.KEY;
    this.ignoreEvents = false;
    ap.Events.on('ready', [this, this.initialize]);
  };

  Input.prototype.initialize = function initialize() {
    var self = this;
    $(document).keydown($.proxy(ap.Input.inputCallback, ap.Input));
    $(document).keyup  ($.proxy(ap.Input.inputCallback, ap.Input));
    $('input').focus(function () { console.log('focus');self.ignoreEvents = true; })
              .blur (function () { self.ignoreEvents = false; });
  };

  Input.prototype.bindKey = function bindKey(key, callback) {
    if (typeof this.bindings.keydown[key] === 'undefined') {
      this.bindings.keydown[key] = [];
    }
    if (typeof callback === 'function') {
      callback = [null, callback];
    }
    this.bindings.keydown[key].push(callback);
  };

  Input.prototype.inputCallback = function inputCallback(e) {//}type, action, input) {
    var type = e.type
      , input = e.which;

    if (this.ignoreEvents === true && 
        (type === 'keydown' || type === 'keyup')) {
      return;
    }

    if (typeof this.bindings[type] === 'undefined' ||
        typeof this.bindings[type][input] === 'undefined') {
      return;
    }

    var i;
    for (i = 0; i < this.bindings[type][input].length; i++) {
      var callback = this.bindings[type][input][i];
      callback[1].call(callback[0], type, input);
    }
  };

  Input.prototype.ignoreEvents = function ignoreEvents(e, ignore) {
    console.log('ignore!');
    this.ignoreEvents = ignore;
  };

  ap.LoadModule(Input);
}());
