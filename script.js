$(document).ready(function() {
    $('.tool-item img').on('mouseenter', function() {
        $(this).siblings('.tool-colors').css('display', 'flex');
    });

    $('.tool-item').on('mouseleave', function() {
        $(this).find('.tool-colors').css('display', 'none');
    });
});
