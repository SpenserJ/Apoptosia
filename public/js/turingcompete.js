var TCModel = function TCModel() {
  this.connected = ko.observable(false);
  this.chat = new ChatModel();
  this.authentication = new AuthenticationModel();
};

var tcKnockout = new TCModel();
ko.applyBindings(tcKnockout);

socket.on('connect', function() {
  if (tcKnockout.connected() === true) {
    location.reload(true);
  }
  tcKnockout.connected(true);
});
