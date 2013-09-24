var ChatModel = function() {
  var self = this;
  self.messages = ko.observableArray([]);
  self.inputMessage = ko.observable('');

  self.sendMessage = function sendMessage() {
    if (tcKnockout.authentication.authenticated() === true && self.inputMessage() !== '') {
      socket.emit('chat', { username: tcKnockout.authentication.username(), message: self.inputMessage() });
      self.inputMessage('');
    }
  };
};

socket.on('chat', function (data) {
  tcKnockout.chat.messages.push(data);
});

socket.on('chat.member.joined', function (data) {
  tcKnockout.chat.messages.push({
    username: 'Turing Compete',
    message: data.username + ' has joined the chat!'
  });
});

socket.on('chat.member.left', function (data) {
  tcKnockout.chat.messages.push({
    username: 'Turing Compete',
    message: data.username + ' has left the chat!'
  });
});
