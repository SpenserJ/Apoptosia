var ChatModel = function() {
  this.messages = ko.observableArray([]);
  this.chatInput = ko.observable('');

  this.sendChat = function sendChat() {
    if (this.chatInput() !== '') {
      socket.emit('chat', { username: 'client', message: this.chatInput() });
      this.chatInput('');
    }
  };
};

var chat = new ChatModel();

ko.applyBindings(chat);

socket.on('chat', function (data) {
    console.log(data);
  chat.messages.push(data);
});

function sendChat(e) {
  console.log('yay');
}
