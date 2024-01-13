$(document).ready(function () {

  var $window = $(window),
  $stickyEl = $('#the-sticky-div'),
  $stickyE2 = $('#sticky-description'),
  elTop = $stickyEl.offset().top;

  $window.scroll(function () {
    $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
    $stickyE2.toggleClass('line-clamp-3', $window.scrollTop() > elTop);
  });
  
}); 
