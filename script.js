$(document).ready(function() {
    var canvas = document.querySelector("canvas");
    var context = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    //Adding some default values
    var mouseX = 0;
    var mouseY = 0;

    var isDrawing = false;
    var isDrawingPencil = false;
    var isDrawingCrayon = false;
    var isDrawingPaint = false;

    $('.color-option').on('click', function() {
        context.strokeStyle = $(this).css('background-color');
    });

    $('.eraser').on('click', function() {
        context.strokeStyle = 'white';
    });

    $('.pencil').on('click', function() {
        isDrawingPencil = true;
        isDrawingCrayon = false;
        isDrawingPaint = false;
    });

    $('.crayon').on('click', function() {
        isDrawingPencil = false;
        isDrawingCrayon = true;
        isDrawingPaint = false;
    });

    $('.paint').on('click', function() {
        isDrawingPencil = false;
        isDrawingCrayon = false;
        isDrawingPaint = true;
    });

    $('.saver').on('click', function() {
        let canvasUrl = canvas.toDataURL();
        const createEl = document.createElement('a');
        createEl.href = canvasUrl;
        createEl.download = "download-this-pretty-canvas";
        createEl.click();
        createEl.remove();
    });

    $('.upload').click(function() {
        $('.upload-file').trigger('click');
    });

    $('.upload-file').on('change', function() {
        var file = this.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            var dataUrl = reader.result;
            var image = new Image();
            image.src = dataUrl;
            image.onload = function() {
                context.drawImage(image, 0, 0);
            };
        };
        reader.readAsDataURL(file);
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
        if(isDrawing){
            if (isDrawingPencil) {
                context.lineWidth = 2;
            }

            if (isDrawingCrayon) {
                context.lineWidth = 10;
                context.lineJoin = 'round';
                context.lineCap = 'round';
            }

            if (isDrawingPaint) {
                context.lineWidth = 20;
                context.lineJoin = 'round';
                context.lineCap = 'square';
            }

            if (event.button === 0) {
                var rect = canvas.getBoundingClientRect();
                mouseX = event.clientX - rect.left;
                mouseY = event.clientY - rect.top;
                context.lineTo(mouseX, mouseY);
                context.stroke();
            }

            context.lineWidth = 0;
        }
    });

    canvas.addEventListener('mouseup', function() {
        isDrawingPencil = false;
        isDrawingCrayon = false;
        isDrawingPaint = false;
        isDrawing = false;
    });
});
