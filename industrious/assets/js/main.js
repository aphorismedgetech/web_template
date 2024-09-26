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