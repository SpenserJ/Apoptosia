var AuthenticationModel = function AuthenticationModel() {
  var self = this;
  self.authenticated = ko.observable(false);
  self.username = ko.observable('');

  self.login = function login() {
    if (self.username() !== "") {
      socket.emit('login', { username: self.username() });
    }
  };
};

socket.on('login.successful', function() {
  tcKnockout.authentication.authenticated(true);
});
