(function () {
  var Authentication = function Authentication() {
    ap.Events.on('IO.connect', [this, this.login]);
    ap.Events.on('IO.login.successful', [this, this.loginSuccessful]);
    ap.Events.on('IO.login.failed', [this, this.loginFailed]);
    this.username = Math.random().toString(36).replace(/[^a-z]+/g, '');
    this.id = null;
  };

  Authentication.prototype.login = function login() {
    ap.IO.emit('login', { username: this.username });
  };

  Authentication.prototype.loginSuccessful = function loginSuccessful(data) {
    this.id = data.id;
  };

  Authentication.prototype.loginFailed = function loginFailed(data) {
    console.log('Login failed!', data);
  };

  ap.LoadModule(Authentication);
}());
