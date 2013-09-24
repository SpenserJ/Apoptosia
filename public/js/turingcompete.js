var socket = io.connect();
socket.on('version', function (data) {
  console.log(data);
});
