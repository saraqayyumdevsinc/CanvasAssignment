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

    $('.eraser').on('click', function() {
        context.strokeStyle = 'white';
    });

    $('.saver').on('click', function() {
        let canvasUrl = canvas.toDataURL();
        // Create an anchor, and set the href value to our data URL
        const createEl = document.createElement('a');
        createEl.href = canvasUrl;

        // This is the name of our downloaded file
        createEl.download = "download-this-canvas";

        // Click the download button, causing a download, and then remove it
        createEl.click();
        createEl.remove();
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

    // var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    // window.location.href=image;
  });
