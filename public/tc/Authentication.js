(function () {
  var Authentication = function Authentication() {
    tc.Events.on('IO.connect', [this, this.login]);
  };

  Authentication.prototype.login = function login() {
    tc.IO.emit('login', { username: Math.random().toString(36).replace(/[^a-z]+/g, '') });
  };

  tc.LoadModule(Authentication);
}());
