/*
	Industrious by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/
(function($) {

	var	$window = $(window),
		$banner = $('#banner'),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				target: $body,
				visibleClass: 'is-menu-visible',
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right'
			});

})(jQuery);


function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const increment = target / 100; // Speed control
    let currentValue = 0;
    
    const updateCounter = () => {
        currentValue += increment;
        
        if (currentValue < target) {
            counter.innerText = Math.ceil(currentValue);
            requestAnimationFrame(updateCounter); // Smooth animation
        } else {
            counter.innerText = target; // Set to the final target value
        }
    };
    
    updateCounter();
}

// Intersection Observer to start the counter when in view
let countersStarted = false;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => animateCounter(counter));
            countersStarted = true; // Prevent repeated animations
        }
    });
}, { threshold: 0.5 }); // Start when 50% of the section is in view

observer.observe(document.querySelector('#counter-section'));

// jQuery(document).ready(function($) {
// 	"use strict";
// 	//  TESTIMONIALS CAROUSEL HOOK
// 	$('#customers-testimonials').owlCarousel({
// 		loop: true,
// 		center: true,
// 		items: 3,
// 		margin: 0,
// 		autoplay: true,
// 		dots:true,
// 		autoplayTimeout: 2500,
// 		smartSpeed: 450,
// 		responsive: {
// 		  0: {
// 			items: 1
// 		  },
// 		  768: {
// 			items: 2
// 		  },
// 		  1170: {
// 			items: 3
// 		  }
// 		}
// 	});
// });


// Owlcarousel
$(document).ready(function(){
	$(".my-owl-carousel").owlCarousel({
	  loop: true,
	  margin: 10,
	  nav: true,
	  autoplay: true,
	  autoplayTimeout: 3000,
	  autoplayHoverPause: true,
	  center: true,
	  navText: [
		"<i class='fa fa-angle-left'></i>",
		"<i class='fa fa-angle-right'></i>"
	  ],
	  responsive: {
		0: {
		  items: 1
		},
		600: {
		  items: 1
		},
		1000: {
		  items: 3
		}
	  }
	});
  });  


//    ---------------------------------------------------------------------------------


  // -- slider w/o owl carousel


  const slider = document.querySelector('.testimonial-slider');
  const slides = document.querySelectorAll('.testimonial-card');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  
  let currentIndex = 1; // Start at the first original slide
  let totalSlides = slides.length + 2; // Account for the cloned slides
  let autoSlideInterval;
  
  // Clone the first and last slides
  const firstSlide = slides[0].cloneNode(true);
  const lastSlide = slides[slides.length - 1].cloneNode(true);
  
  slider.appendChild(firstSlide); // Add the first slide clone to the end
  slider.insertBefore(lastSlide, slides[0]); // Add the last slide clone to the start
  
  // Function to update slider position
  function updateSlider(instant = false) {
	  const slideWidth = slides[0].clientWidth;
	  const sliderWidth = slider.clientWidth;
  
	  // Center the active slide
	  const translateX = -(currentIndex * slideWidth) + (sliderWidth / 2) - (slideWidth / 2);
  
	  // Disable transition for instant changes (when resetting from clones)
	  if (instant) {
		  slider.style.transition = 'none';
	  } else {
		  slider.style.transition = 'transform 0.5s ease-in-out';
	  }
  
	  slider.style.transform = `translateX(${translateX}px)`;
  
	  // Reset transition property after instant changes
	  if (instant) {
		  setTimeout(() => {
			  slider.style.transition = 'transform 0.5s ease-in-out';
		  }, 50);
	  }
  
	  // Handle the "active" class for slides
	  const allSlides = slider.querySelectorAll('.testimonial-card');
	  allSlides.forEach((slide, index) => {
		  if (index === currentIndex) {
			  slide.classList.add('active');
		  } else {
			  slide.classList.remove('active');
		  }
	  });
  
	  // Loop back when reaching cloned slides
	  if (currentIndex === totalSlides - 1) {
		  setTimeout(() => {
			  currentIndex = 1; // Reset to the first original slide
			  updateSlider(true); // Instantly reset
		  }, 500);
	  } else if (currentIndex === 0) {
		  setTimeout(() => {
			  currentIndex = totalSlides - 2; // Move back to the last original slide
			  updateSlider(true); // Instantly reset
		  }, 500);
	  }
  }
  
  // Handle next slide
  function showNextSlide() {
	  currentIndex++;
	  updateSlider();
  }
  
  // Handle previous slide
  function showPrevSlide() {
	  currentIndex--;
	  updateSlider();
  }
  
  // Start Auto Slide
  function startAutoSlide() {
	  autoSlideInterval = setInterval(showNextSlide, 3000); // Slide every 3 seconds
  }
  
  // Stop Auto Slide
  function stopAutoSlide() {
	  clearInterval(autoSlideInterval);
  }
  
  // Event listeners for manual controls
  nextButton.addEventListener('click', showNextSlide);
  prevButton.addEventListener('click', showPrevSlide);
  
  // Pause auto-slide on hover
  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);
  
  // Initialize the slider
  currentIndex = 1; // Start at the first original slide (due to clone prepending)
  updateSlider(true); // Position to first original slide instantly
  startAutoSlide(); // Start auto slide
  