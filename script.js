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

    $(window).on('load', function() {
        canvasHeight = canvas.offsetHeight;
        canvasWidth = canvas.offsetWidth;
    });

    $(window).on('resize', function() {
        canvasHeight = canvas.offsetHeight;
        canvasWidth = canvas.offsetWidth;
    });


    $('.color-option').on('click', function() {
        context.strokeStyle = $(this).css('background-color');
    });

    $('.eraser').on('click', function() {
        context.lineWidth = 10;
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

    $('.text').on('click', function() {
        var header= prompt("Enter title");

        context.font = "bold 20px Arial";
        context.textAlign = 'center';
        context.fillText(header, (canvas.width / 2), (25));

        var footer= prompt("Enter footer");
        context.font = "15px Arial";
        context.textAlign = 'center';
        context.fillText(footer, (canvas.width / 2), (canvas.height - 10));
    });

    $('.clear').on('click', function() {;
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    $(window).on('resize', function() {
        var windowWidth = window.innerWidth;
        if (!((windowWidth <= 1270 && windowWidth > 880) || windowWidth >= 1270)) {
            $('.my-toggler').css('display', 'block');
        }
        else{
            if ($('#icon-container').hasClass('show')) {
                $('.my-toggler').css('display', 'none');
            }
        }
    });


    $('.my-toggler').on('click', function(){
        var windowWidth = window.innerWidth;
        if( windowWidth <=1270 && windowWidth>880){
            $(this).css('display','none')
        }
    })

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


    function handleResize() {
        var windowWidth = window.innerWidth;
        var imgElement = document.querySelector('img[data-bs-target="#icon-container"]');
        var iconContainer = document.querySelector('#icon-container');
        var contain = document.querySelector('.justify-content-between')

        if (windowWidth <= 1270) {
            imgElement.classList.remove('d-none');
            imgElement.classList.add('collapsed')
            iconContainer.classList.add('collapse')
            contain.classList.remove('justify-content-between')
        }
        else{
            imgElement.classList.add('d-none');
            imgElement.classList.remove('collapsed')
            iconContainer.classList.remove('collapse')
            contain.classList.add('justify-content-between')
        }
    }

    function handleLoading() {
        var windowWidth = window.innerWidth;
        var imgElement = document.querySelector('img[data-bs-target="#icon-container"]');
        var iconContainer = document.querySelector('#icon-container');
        var contain = document.querySelector('.justify-content-between')

        if (windowWidth <= 1270) {
            imgElement.classList.remove('d-none');
            imgElement.classList.add('collapsed')
            iconContainer.classList.add('collapse')
            contain.classList.remove('justify-content-between')
        }
        else{
            imgElement.classList.add('d-none');
            imgElement.classList.remove('collapsed')
            iconContainer.classList.remove('collapse')
            contain.classList.add('justify-content-between')
        }
    }

    window.addEventListener('resize', handleLoading);
    window.addEventListener('load', handleLoading)

});
