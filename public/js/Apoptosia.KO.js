var APModel = function APModel() {
  var _dummyObservable = {
    Authentication: ko.observable()
  };

  this.invalidateObservable = function invalidateObservable(name) {
    _dummyObservable[name].notifySubscribers();
  };

  this.connected = ko.observable(false);
  this.authenticated = ko.computed(function () {
    _dummyObservable.Authentication();
    return ap.Authentication.id !== null;
  });
  this.chat = new ChatModel();
  //this.authentication = new AuthenticationModel();
};

ap.Events.on('ready', function () {
  ap.KO = new APModel();
  ko.applyBindings(ap.KO);
});

ap.Events.on('IO.login.successful', function () {
  ap.KO.invalidateObservable('Authentication');
});
