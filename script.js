$(document).ready(function() {
    $('.tool-item img').on('mouseenter', function() {
        $(this).siblings('.tool-colors').css('display', 'flex');
    });

    $('.tool-item').on('mouseleave', function() {
        $(this).find('.tool-colors').css('display', 'none');
    });

    var canvas = document.querySelector("canvas"); // Use querySelector instead of getElementsByTagName
    console.log(canvas);
    var context = canvas.getContext("2d");
    console.log(context);
    var boundings = canvas.getBoundingClientRect();

    var mouseX = 0;
    var mouseY = 0;
    context.strokeStyle = 'black'; // initial brush color
    context.lineWidth = 1; // initial brush width
    var isDrawing = false;

    // Handle Colors
    var colors = document.getElementsByClassName('color-option');

    colors.addEventListener('click', function(event) {
    context.strokeStyle = event.target.value || 'black';
  });
});
