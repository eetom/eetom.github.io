$(document).ready(function () {
  var $window = $(window),
    $stickyEl = $('#the-sticky-div'),
    $stickyE2 = $('#sticky-description'),
    elTop = $stickyEl.offset().top;

  $window.scroll(function () {
    $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
    $stickyE2.toggleClass('line-clamp-4', $window.scrollTop() > elTop);
  });

  // Add the scroll event listener to update the active state of the side navigation
  $(window).scroll(function () {
    var scrollPosition = $window.scrollTop();

    // If scroll position is at the top, remove active class from all links
    if (scrollPosition === 0) {
      $(".lockednav-links a").removeClass("active");
    }

    // Iterate through each section
    $("h3.work-title").each(function () {
      var section = $(this);
      var sectionId = section.attr("id"); // Get the ID of the section

      if (!sectionId) {
        console.log("Section ID not found.");
        return; // Skip if section ID is not found
      }

      var sectionTop = section.offset().top;
      var sectionBottom = sectionTop + section.outerHeight();

      // Check if the current scroll position is within this section
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        console.log("Entering section:", sectionId);

        // Update the active state of the corresponding link in the side navigation
        $(".lockednav-links a").removeClass("active");
        $(".lockednav-links a[href='#" + sectionId + "']").addClass("active");

        console.log("Active class added to link:", sectionId);
      }
    });
  });
});
