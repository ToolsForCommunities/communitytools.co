(function($) {
	"use strict"

	$('body').scrollspy({
		target: '#nav',
		offset: $(window).height() / 2
	});

	$("#nav .main-nav a[href^='#']").on('click', function(e) {
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top
		}, 600);
	});
  
  $("a[href^='#']").on('click', function(e) {
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top
		}, 600);
	});

	$(window).on('scroll', function() {
		var wScroll = $(this).scrollTop();

		// Fixed nav
		wScroll > 1 ? $('#nav').addClass('fixed-nav') : $('#nav').removeClass('fixed-nav');

	});

	$('form').on('submit', function (e) {
		e.preventDefault();
		
		var button = $(this).find('button');
		var emailField = $(this).find('input[type="email"]');

		var email = emailField.val();
		if (!validateEmail(email)) {
			console.log('Invalid email');
			return false;
		}

		// Send to Hubspot
		var _hsq = window._hsq = window._hsq || [];
		_hsq.push(["identify",{
			email: email,
		}]);

		// Use the button as "confirmation of action" (fake)
		var buttonText = button.text();
		button.text('Loading...');

		emailField.prop("disabled", true);
		button.prop("disabled", true);

		setTimeout(function () {
			button.text('Done!');

			emailField.val('');
			emailField.prop("disabled", false);
			button.prop("disabled", false);
			
			setTimeout(function () {
				button.text(buttonText);
			}, 1500);
		}, 700);
	});

	function validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	// Track dynamic events
	$('*[data-track]').on('click', trackClick);
	
	/** trackClick
	 *	Send to analytics an event
	 *	 - data-track="EVENT_NAME"
	 *	 - data-track-category="EVENT_CATEGORY"
	 *	 - data-track-label="EVENT_LABEL"
	 *
	 *	@param e {Event} Click DOM event
	 */
	function trackClick(e) {
		var data = e.target.dataset;

		var event = data.track;
		var category = data.trackCategory || 'landing';
		var label = data.trackLabel;
		var value = data.trackValue;

		gtag('event', event, {
			'event_category': category,
			'event_label': label,
			'value': value,
		});
	}

})(jQuery);
