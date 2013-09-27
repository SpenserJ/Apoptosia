(function () {
  var IO = function IO() {
    console.log('TCClient.IO()');
    this.watchedEvents = [];
    tc.Events.on('Renderer.loaded', [this, this.connect]);
    tc.Events.on('Events.on', [this, this.on]);
  };

  IO.prototype.connect = function connect() {
    var self = this;

    self.socket = io.connect();
    self.socket.on('connect', function () {
      if (typeof self.watchedEventsToAdd !== 'undefined') {
        var eventInfo;
        while ((eventInfo = self.watchedEventsToAdd.shift()) !== undefined) {
          self.on(eventInfo[0], eventInfo[1]);
        }
      }
      tc.Events.trigger('IO.connect');
    });
    self.socket.on('disconnect', function () {
      tc.Events.trigger('IO.disconnect');
    });
  };

  IO.prototype.on = function on(event, callback) {
    if (event.substr(0, 3) !== 'IO.') { return; }

    if (typeof this.socket === 'undefined') {
      if (typeof this.watchedEventsToAdd === 'undefined') { this.watchedEventsToAdd = []; }
      return this.watchedEventsToAdd.push([event, callback]);
    }

    if (this.watchedEvents.indexOf(event) === -1) {
      this.watchedEvents.push(event);
      this.socket.on(event.substr(3), function (data) {
        tc.Events.trigger(event, data);
      });
    }
  };

  tc.LoadModule(IO);
}());
