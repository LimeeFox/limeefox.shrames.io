/*
document.addEventListener("DOMContentLoaded", function() {
    let imageIndex = 0;
    let currentImage = 1;
    const images = [
      '/background/minastirith0.png',
      '/background/helmsdeep0.png',
      '/background/grimslade1.png',
      '/background/edhellond0.png',
      '/background/edoras0.png',
      '/background/edhellond1.png',
      '/background/grimslade0.png',
      '/background/edhellond2.png',
    ];
    const slideshowImage1 = document.getElementById('slideshow-image1');
    const slideshowImage2 = document.getElementById('slideshow-image2');
  
    // Pre-load images
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  
    slideshowImage1.src = images[imageIndex];
    slideshowImage2.src = images[(imageIndex + 1) % images.length];
  
    setInterval(function() {
      if(currentImage == 1) {
        slideshowImage1.style.opacity = 0;
        slideshowImage2.style.opacity = 1;
        currentImage = 2;
      } else {
        slideshowImage1.style.opacity = 1;
        slideshowImage2.style.opacity = 0;
        currentImage = 1;
      }
      imageIndex = (imageIndex + 1) % images.length;
      setTimeout(() => {
        const nextImage = images[(imageIndex+1) % images.length];
        if(currentImage == 1) {
          slideshowImage2.src = nextImage;
        } else {
          slideshowImage1.src = nextImage;
        }
      }, 1000);
    }, 8000); // Change image every 8 seconds
  });
*/

window.addEventListener("scroll", function() {
    var scrollPosition = window.pageYOffset;
    var logo = document.getElementById("logo");
    var backgroundSection = document.getElementById("background-section");

    logo.style.transform = "translate(-50%, calc(-50% - " + (scrollPosition * 2) + "px))";
    backgroundSection.style.transform = "translateY(" + (-scrollPosition * 0.5) + "px)"; //1.2

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

const scroll = new LocomotiveScroll({
  el: document.querySelector('#main-container'),
  smooth: true
});

scroll.on('scroll', (instance) => {
  const dividerPage = document.querySelector('#divider-page');
  dividerPage.style.transform = `translateY(-${instance.scroll.y}px)`;
});
