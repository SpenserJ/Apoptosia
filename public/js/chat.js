var ChatModel = function() {
  var self = this;
  self.messages = ko.observableArray([]);
  self.inputMessage = ko.observable('');

  self.sendMessage = function sendMessage() {
    if (ap.KO.authenticated() === true && self.inputMessage() !== '') {
      ap.IO.emit('chat', { message: self.inputMessage() });
      self.inputMessage('');
    }
  };
};

ap.Events.on('IO.chat', function (data) {
  ap.KO.chat.messages.push(data);
});

ap.Events.on('IO.chat.member.joined', function (data) {
  ap.KO.chat.messages.push({
    username: 'Turing Compete',
    message: data.username + ' has joined the chat!'
  });
});

ap.Events.on('IO.chat.member.left', function (data) {
  ap.KO.chat.messages.push({
    username: 'Turing Compete',
    message: data.username + ' has left the chat!'
  });
});
