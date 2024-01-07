import $ from 'jquery';

// Disable scroll
export function disableScroll() {
	// Get the current page scroll position
	scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	(scrollLeft = window.pageXOffset || document.documentElement.scrollLeft),
		// if any scroll is attempted, set this to the previous value
		(window.onscroll = function () {
			window.scrollTo(scrollLeft, scrollTop);
		});
}

// Enable scroll
export function enableScroll() {
	window.onscroll = function () {};
	$('body').removeClass('--hide-scrollbar');
}
