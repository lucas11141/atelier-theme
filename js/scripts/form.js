import $ from 'jquery';

export default function form() {
	//Input Border Farbe bei Füllung färben
	$('input, textarea').each(function () {
		if ($(this).val() !== '') {
			$(this).addClass('input--filled');
			$(this).parents('.form-row').addClass('form-row--filled');
		}
	});
	$('input, textarea').on('keyup change', function () {
		if ($(this).val() !== '') {
			$(this).addClass('input--filled');
			$(this).parents('.form-row').addClass('form-row--filled');
		} else {
			$(this).removeClass('input--filled');
			$(this).parents('.form-row').removeClass('form-row--filled');
		}

		$(this).parent('p').removeClass('--error');
	});

	// Formular anpassen
	$("<div class='checkmark'></div>").insertAfter('.standard-formular input[type="checkbox"]');
	$('input.half').each(function () {
		$(this).parent().addClass('half');
	});

	// Kontaktformular: Lebel rot bei falscher eingabe
	// TODO - find better way to do this
	waitForElementToDisplay(
		'.wpcf7-not-valid-tip',
		function () {
			$('.wpcf7-not-valid-tip')
				.parent()
				.parent()
				.find('.labeltext')
				.css('color', 'rgb(218, 15, 15)');
		},
		10,
		9000
	);
	function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
		var startTimeInMs = Date.now();
		(function loopSearch() {
			if (document.querySelector(selector) != null) {
				callback();
				return;
			} else {
				setTimeout(function () {
					if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs) return;
					loopSearch();
				}, checkFrequencyInMs);
			}
		})();
	}
}
