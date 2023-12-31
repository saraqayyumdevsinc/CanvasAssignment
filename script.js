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


    //On loading, we calibrate the canvas size
    $(window).on('load', function() {
        canvasHeight = canvas.offsetHeight;
        canvasWidth = canvas.offsetWidth;
    });

    //On resizing, we re-calibrate the canvas size
    $(window).on('resize', function() {
        canvasHeight = canvas.offsetHeight;
        canvasWidth = canvas.offsetWidth;
    });


    //Changing color
    $('.color-option').on('click', function() {
        context.strokeStyle = $(this).css('background-color');
    });

    //White color addition for eraser effect
    $('.eraser').on('click', function() {
        context.lineWidth = 10;
        context.strokeStyle = 'white';
    });

    $('.pencil').on('click', function() {
        isDrawingPencil = true;
        isDrawingCrayon = false;
        isDrawingPaint = false;

        var crayon = document.querySelector('#crayon');
        var paint = document.querySelector('#paint');
        crayon.classList.remove('show');
        paint.classList.remove('show');
    });

    $('.crayon').on('click', function() {
        isDrawingPencil = false;
        isDrawingCrayon = true;
        isDrawingPaint = false;

        var pencil = document.querySelector('#pencil');
        var paint = document.querySelector('#paint');
        pencil.classList.remove('show');
        paint.classList.remove('show');
    });

    $('.paint').on('click', function() {
        isDrawingPencil = false;
        isDrawingCrayon = false;
        isDrawingPaint = true;

        var pencil = document.querySelector('#pencil');
        var crayon = document.querySelector('#crayon');
        pencil.classList.remove('show');
        crayon.classList.remove('show');
    });

    //Saving image functionality
    $('.saver').on('click', function() {
        let canvasUrl = canvas.toDataURL();
        const createEl = document.createElement('a');
        createEl.href = canvasUrl;
        createEl.download = "download-this-pretty-canvas";
        createEl.click();
        createEl.remove();
    });

    //Triggering file prompt on clicking upload image icon
    $('.upload').click(function() {
        $('.upload-file').trigger('click');
    });

    //Uploading image functionality
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


    //Adding text functionality (header - footer)
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

    //Clearing canvas functionality
    $('.clear').on('click', function() {;
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    //Toggling the icon container for medium screen
    $(window).on('resize', function() {
        var windowWidth = window.innerWidth;
        if (!((windowWidth <= 1528 && windowWidth > 880) || windowWidth >= 1528)) {
            $('.my-toggler').css('display', 'block');
        }
        else{
            if ($('#icon-container').hasClass('show')) {
                $('.my-toggler').css('display', 'none');
            }
        }
    });


    //Removing toggle icon for medium screen
    $('.my-toggler').on('click', function(){
        var windowWidth = window.innerWidth;
        if( windowWidth <=1528 && windowWidth>880){
            $(this).css('display','none')
        }
    })

    $('.pencil').on('click', function() {
        var crayon = document.querySelector('#crayon');
        var paint = document.querySelector('#paint');
        crayon.classList.remove('show');
        paint.classList.remove('show');
    });

    //Drawing functionality
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


    //Toggle icon functionality added for medium and small screens
    function handleResize() {
        var windowWidth = window.innerWidth;
        var imgElement = document.querySelector('img[data-bs-target="#icon-container"]');
        var iconContainer = document.querySelector('#icon-container');
        var contain = document.querySelector('.justify-content-between')

        if (windowWidth <= 1528) {
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
        var contain = document.querySelector('.justify-content-between');

        if (windowWidth <= 1528) {
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
