function lazyLoadMedia() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const media = entry.target;
                const src = media.getAttribute('data-src');
                if (src) {
                    media.src = src;
                    media.onerror = () => console.log('Error loading media.');
                    media.removeAttribute('data-src');
                    observer.unobserve(media);
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('img[data-src], iframe[data-src]').forEach(media => {
        observer.observe(media);
    });
}

document.addEventListener('DOMContentLoaded', lazyLoadMedia);

var totalSlides = document.querySelectorAll('.background_slide').length;
var currentSlideIndex = 0;
var slides = document.querySelectorAll('.background_slide[data-bg-url]');

function lazyLoadBackgrounds() {
    // Load current slide
    var currentSlide = slides[currentSlideIndex];
    var bgUrl = currentSlide.getAttribute('data-bg-url');
    if (bgUrl) {
        currentSlide.style.backgroundImage = `url('${bgUrl}')`;
        currentSlide.removeAttribute('data-bg-url');
    }

    // Preload next slide
    var nextSlideIndex = (currentSlideIndex + 1) % totalSlides;
    var nextSlide = slides[nextSlideIndex];
    var nextBgUrl = nextSlide.getAttribute('data-bg-url');
    if (nextBgUrl) {
        nextSlide.style.backgroundImage = `url('${nextBgUrl}')`;
        nextSlide.removeAttribute('data-bg-url');
    }

    // Update current slide index
    currentSlideIndex = nextSlideIndex;
}

// Define the setActiveLink function separately
function setActiveLink() {
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('nav a');
  
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            links.forEach(link => {
                if (link.id !== 'nav-logo') {
                    link.classList.remove('active');
                }
            });
            if (links[index].id !== 'nav-logo') {
                links[index].classList.add('active');
            }
        }
    });
  }

// Add a scroll event listener to check the active section on scroll
window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink); // For initial load

// Add a scroll event listener for the animations and interactions
window.addEventListener("scroll", function() {
  var scrollPosition = window.pageYOffset;
  var logo = document.getElementById("logo");
  var backgroundSection = document.getElementById("background-section");
  var navbar = document.getElementById('navbar');
  var ipButton = document.getElementById('server-ip-button');

  logo.style.transform = "translate(-50%, calc(-50% - " + (scrollPosition * 2) + "px))";
  backgroundSection.style.transform = "translateY(" + (-scrollPosition * 0.3) + "px)";

  // Add the logic for the navbar
  if (scrollPosition > 80) {
      navbar.classList.add('scrolled');
      ipButton.classList.add('scrolled');
  } else {
      navbar.classList.remove('scrolled');
      ipButton.classList.remove('scrolled');
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

  // Call setActiveLink to highlight buttons in navbar
  //setActiveLink();

  // Load pictures progressively
  /////////////////////////////////////////////////////////////lazyLoadMedia();
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

document.addEventListener("DOMContentLoaded", function() {
    let alertVisible = false;

    document.getElementById("server-ip-button").addEventListener("click", function() {
        const textToCopy = "play.empirewar.org";
        navigator.clipboard.writeText(textToCopy);
        alertSuccess();
    });

    document.getElementById("ip-address").addEventListener("click", function() {
        const textToCopy = "play.empirewar.org";
        navigator.clipboard.writeText(textToCopy);
        const alertDiv = document.getElementById("alert-success");
        alertSuccess()
    });
});

function alertSuccess() {
    const alertDiv = document.getElementById("alert-success");
      alertDiv.style.display = "flex";

      setTimeout(function() {
        alertDiv.style.display = "none";
      }, 3000); // Hide after 3000 milliseconds (3 seconds)
}

document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('width')) {
        img.setAttribute('width', img.naturalWidth);
    }
    if (!img.hasAttribute('height')) {
        img.setAttribute('height', img.naturalHeight);
    }
});

//lazyLoadBackgrounds();

//setInterval(lazyLoadBackgrounds, 4000);
setTimeout(clearInterval, 33000)