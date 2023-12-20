$(document).ready(function () {


  // Cache selectors outside callback for performance.
        var $window = $(window),
        $stickyEl = $('#the-sticky-div'),
        elTop = $stickyEl.offset().top;

        $window.scroll(function () {
            $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
    });

    // Your code in here.
}); 
