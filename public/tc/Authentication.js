(function () {
  var Authentication = function Authentication() {
    tc.Events.on('IO.connect', [this, this.login]);
    tc.Events.on('IO.login.successful', [this, this.loginSuccessful]);
    tc.Events.on('IO.login.failed', [this, this.loginFailed]);
    this.username = Math.random().toString(36).replace(/[^a-z]+/g, '');
    this.id = null;
  };

  Authentication.prototype.login = function login() {
    tc.IO.emit('login', { username: this.username });
  };

  Authentication.prototype.loginSuccessful = function loginSuccessful(data) {
    this.id = data.id;
  };

  Authentication.prototype.loginFailed = function loginFailed(data) {
    console.log('Login failed!', data);
  };

  tc.LoadModule(Authentication);
}());
