(function() {
  var connected = false;
  ap.Events.on('IO.connect', function() {
    if (connected === true) {
      return location.reload();
    }
    connected = true;
  });
}());
