/**
window.addEventListener("scroll", function() {
    var scrollPosition = window.pageYOffset;
    var logo = document.getElementById("logo");
    var backgroundSection = document.getElementById("background-section");

    logo.style.transform = "translate(-50%, calc(-50% - " + (scrollPosition * 2) + "px))";
    backgroundSection.style.transform = "translateY(" + (-scrollPosition * 0.3) + "px)"; //1.2

    // Calculate opacity
    var maxScroll = 300;
    var opacity = 1 - (scrollPosition / maxScroll);

    // Make sure opacity stays within a range of 0 and 1
    if (opacity < 0) {
        opacity = 0;
    } else if (opacity > 1) {
        opacity = 1;
    }

    logo.style.opacity = opacity;
});
*/


window.addEventListener("scroll", function() {
  var scrollPosition = window.pageYOffset;
  var logo = document.getElementById("logo");
  var backgroundSection = document.getElementById("background-section");
  var navbar = document.getElementById('navbar');  // Access the navbar

  logo.style.transform = "translate(-50%, calc(-50% - " + (scrollPosition * 2) + "px))";
  backgroundSection.style.transform = "translateY(" + (-scrollPosition * 0.3) + "px)";

  // Add the logic for the navbar
  if (scrollPosition > 80) {
      navbar.classList.add('scrolled');
  } else {
      navbar.classList.remove('scrolled');
  }

  // Calculate opacity
  var maxScroll = 300;
  var opacity = 1 - (scrollPosition / maxScroll);

  // Make sure opacity stays within a range of 0 and 1
  if (opacity < 0) {
      opacity = 0;
  } else if (opacity > 1) {
      opacity = 1;
  }

  logo.style.opacity = opacity;
});


$(document).ready(function() {
  var $slickEl = $('.slider');
  var $st = $('#status');

  
  $slickEl.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $st.text(i + ' of ' + slick.slideCount);
    // Reset all slides
    $('.slick-slide').css("opacity", 0.5).css("transform", "scale(0.8)");
    // Then set the active one
    $('.slick-center').css("opacity", 1).css("transform", "scale(1)");
  });

  $('.slider').slick({
    centerMode: true,
    variableWidth: true,
    slidesToShow: 1,
    focusOnSelect: true,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                arrows: true,
                centerMode: true,
                variableWidth: true,
                slidesToShow: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                arrows: true,
                centerMode: true,
                variableWidth: true,
                slidesToShow: 1
            }
        }
    ]
  });

  $('.selector').slick({
    nextArrow: '<i class="fa fa-arrow-right"></i>',
    prevArrow: '<i class="fa fa-arrow-left"></i>',
    // add the rest of your options here
  });



  // Trigger the event to set the initial slide's style
  $slickEl.slick('slickGoTo', 0, true);

});