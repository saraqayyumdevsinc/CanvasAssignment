$(document).ready(function() {
    var canvas = document.querySelector("canvas");
    var context = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    //Adding some default values
    var mouseX = 0;
    var mouseY = 0;
    context.strokeStyle = 'black';
    context.lineWidth = 1;

    var isDrawing = false;

    $('.color-option').on('click', function() {
        context.strokeStyle = $(this).css('background-color');
      });


    canvas.addEventListener('mousedown', function(event) {
        isDrawing = true;

        var rect = canvas.getBoundingClientRect();
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
        context.beginPath();
        context.moveTo(mouseX, mouseY);
    });

    canvas.addEventListener('mousemove', function(event) {
        if (isDrawing) {
            var rect = canvas.getBoundingClientRect();
            mouseX = event.clientX - rect.left;
            mouseY = event.clientY - rect.top;
            context.lineTo(mouseX, mouseY);
            context.stroke();
        }
    });

    canvas.addEventListener('mouseup', function() {
        isDrawing = false;
    });
  });
