(function() {
  var connected = false;
  tc.Events.on('IO.connect', function() {
    if (connected === true) {
      return location.reload();
    }
    connected = true;
  });
}());
