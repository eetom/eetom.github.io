$(document).ready(function () {

  var $window = $(window),
  $stickyEl = $('#the-sticky-div'),
  $stickyE2 = $('#sticky-description'),
  // $stickyE3 = $('#banner'),
  elTop = $stickyEl.offset().top;

  $window.scroll(function () {
    $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
    $stickyE2.toggleClass('line-clamp-3', $window.scrollTop() > elTop);
    // $stickyE3.toggleClass('hidden-on-scroll', $window.scrollTop() > elTop);
  });
  
}); 
