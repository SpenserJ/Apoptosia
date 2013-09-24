var TCModel = function TCModel() {
  this.chat = new ChatModel();
  this.authentication = new AuthenticationModel();
};

var tcKnockout = new TCModel();
ko.applyBindings(tcKnockout);
