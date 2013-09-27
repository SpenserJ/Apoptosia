(function () {
  var Events = function Events() {
    console.log('TCClient.Events()');
    this.callbacks = {};
  };

  Events.prototype.on = function on(event, callback) {
    if (typeof callback === 'function') {
      callback = [null, callback];
    }

    if (typeof this.callbacks[event] === 'undefined') {
      this.callbacks[event] = [];
    }

    this.trigger('Events.on', event, callback);
    this.callbacks[event].push(callback);
  };

  // We make use of the arguments variable, for dynamic arg counts
  Events.prototype.trigger = function trigger(event) {
    var events = this.callbacks[event];
    if (typeof events === 'undefined') { return; }
    var i
      , args = Array.prototype.slice.call(arguments, 1);
    for (i = 0; i < events.length; i++) {
      events[i][1].apply(events[i][0], args);
    }
  };

  tc.LoadModule(Events);
}());
