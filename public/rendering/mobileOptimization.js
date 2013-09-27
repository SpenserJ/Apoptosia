window.onReady(function onReady() {
  // Mobile browser hacks
  if (me.sys.isMobile && !navigator.isCocoonJS) {
    // Prevent the webview from moving on a swipe
    window.document.addEventListener("touchmove", function (e) {
      e.preventDefault();
      window.scroll(0, 0);
      return false;
    }, false);

    // Scroll away mobile GUI
    (function () {
      window.scrollTo(0, 1);
      me.video.onresize(null);
    }).defer();

    me.event.subscribe(me.event.WINDOW_ONRESIZE, function (e) {
      window.scrollTo(0, 1);
    });

    // Retina viewport settings
    if (window.devicePixelRatio > 1) {
      document.getElementById("viewport").setAttribute(
        "content",
        "width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0"
      );
    }
  }
});
