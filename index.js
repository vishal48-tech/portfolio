// Toggle the navbar links display on small screens
$(document).ready(function () {
  $("#navbar-toggle").click(function () {
    // $("#navbar-links-m").toggleClass("animate"); This can be used for without animation
    $(".navbar-links-m").animate({
      height: "toggle",
    });
  });

  $(".navbar-links-m").click(function () {
    $(".navbar-links-m").animate({
      height: "toggle",
    });
  });

  $('.navbar-links-m a').on('click', function(event) {
    event.preventDefault();
    var target = $(this).attr('href');
    var offset = $(target).offset().top - 305;

    $('html, body').animate({
      scrollTop: offset
    });
  });

  $('.navbar-links li a').on('click', function(event) {
    event.preventDefault();
    var target = $(this).attr('href');
    var offset = $(target).offset().top - 70;

    $('html, body').animate({
      scrollTop: offset
    });
  });
});
