var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var isDrawing = false;

//When clicking on control list items
$(".controls").on("click", "li", function () {
  $(this).siblings().removeClass("selected");
  $(this).addClass("selected");
  color = $(this).css("background-color");
});

//When "New Color" is pressed
$("#revealColorSelect").click(function () {
  changeColor();
  $("#colorSelect").toggle();
});

//update the new color span
function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color", "rgb(" + r + "," + g + ", " + b + ")");
}

//When color sliders change
$("input[type=range]").change(changeColor);

//When "Add Color" is pressed
$("#addNewColor").click(function () {
  var $newColor = $("<li></li>");
  $newColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  $newColor.click();
});

//On mouse and touch events on the canvas
$canvas
  .on("mousedown touchstart", function (e) {
    lastEvent = getEventCoordinates(e);
    isDrawing = true;
  })
  .on("mousemove touchmove", function (e) {
    if (!isDrawing) return;
    var currentEvent = getEventCoordinates(e);
    drawLine(lastEvent, currentEvent);
    lastEvent = currentEvent;
  })
  .on("mouseup touchend", function () {
    isDrawing = false;
  });

function getEventCoordinates(e) {
  if (e.type.startsWith("touch")) {
    return {
      x: e.originalEvent.touches[0].pageX - $canvas.offset().left,
      y: e.originalEvent.touches[0].pageY - $canvas.offset().top,
    };
  } else {
    return {
      x: e.pageX - $canvas.offset().left,
      y: e.pageY - $canvas.offset().top,
    };
  }
}

function drawLine(start, end) {
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.strokeStyle = color;
  context.lineWidth = 5;
  context.stroke();
}
