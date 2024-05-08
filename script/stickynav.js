$(document).ready(function () {
  var $window = $(window),
    $stickyEl = $('#the-sticky-div'),
    elTop = $stickyEl.offset().top;


  // Add the scroll event listener to update the active state of the side navigation
  $(window).scroll(function () {
    var scrollPosition = $window.scrollTop();


    // This is for the sticky side nav for projects and portfolios
    if (scrollPosition < 455) {
      $('#the-sticky-div').removeClass("sticky");
    }

    if (scrollPosition >= 455){
      $('#the-sticky-div').addClass("sticky");
    }


    // This is for the active lockednav links in the sticky side nav
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

      var sectionTop = section.offset().top - 50;
      var sectionBottom = sectionTop + section.outerHeight() + 500;

      // Check if the current scroll position is within this section
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {

        // Update the active state of the corresponding link in the side navigation
        $(".lockednav-links a").removeClass("active");
        $(".lockednav-links a[href='#" + sectionId + "']").addClass("active");

      }
    });
  });
});
