$(document).ready(function () {
  var $dragging = null, $draggingPos = [0,0];

  $(document).on("mousemove", function(e) {
    if ($dragging) {
      $dragging.offset({
        left: e.pageX - $draggingPos[0] - 1,
        top:  e.pageY - $draggingPos[1] - 1
      });
    }
  });
  
  $('div.draggable .titlebar').on("mousedown", function (e) {
    if (e.which !== 1) { return; }
    $dragging = $(e.target).parent('.draggable');
    $draggingPos = [e.offsetX, e.offsetY];
  });
  
  $(document).on("mouseup", function (e) {
    $dragging = null;
  });
});
