// TODO: Split this file into multiple files

import $ from 'jquery';
import { scrollOffset } from '../options/variables';

export default function settings() {
	// Leichtes Scrollen
	$('a[href*=\\#]:not([href=\\#])').click(function () {
		if (
			location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
			location.hostname == this.hostname
		) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate(
					{
						scrollTop: target.offset().top - scrollOffset,
					},
					1000
				);
				return false;
			}
		}
	});

	// ANnchor scroll offset on Page Load
	scrollToAnchor();
	function scrollToAnchor() {
		var hash = window.location.hash;
		var target = $(hash);
		if (hash == '' || hash == '#' || hash == undefined) return false;
		// headerHeight = 120;
		target = target.length ? target : $('[name=' + hash.slice(1) + ']');
		if (target.length) {
			$('html,body')
				.stop()
				.animate(
					{
						scrollTop: target.offset().top - 150, //offsets for fixed header
					},
					10
				);
		}
	}

	// Hide Header on Load
	const hiddenHeader = document.querySelector('.header.--hidden-on-load');
	if (hiddenHeader) {
		let dropdownIsOpened = false;
		let showOffset = hiddenHeader.dataset.showOffset;
		let wScroll = $(window).scrollTop();

		const pageStart = document.querySelector('.page__start');
		if (pageStart) {
			showOffset = pageStart.offsetHeight - 350;
		}
		const showHeader = document.querySelector('.show-header-on-offset');
		if (showHeader) {
			showOffset = showHeader.offsetHeight - 350;
		}

		// toggleHeader(wScroll);
		window.addEventListener(
			'scroll',
			() => {
				wScroll = $(window).scrollTop();
				toggleHeader(wScroll);
			},
			{ passive: true }
		);
		// $(window).on("scroll", function() {
		// });
		function toggleHeader(wScroll) {
			if (wScroll > showOffset && wScroll > 20) {
				hiddenHeader.classList.add('--show');
			} else {
				if (!dropdownIsOpened) hiddenHeader.classList.remove('--show');
			}
		}

		hiddenHeader.querySelector('ul').addEventListener('mouseenter', () => {
			dropdownIsOpened = true;
		});
		hiddenHeader.querySelector('ul').addEventListener('mouseleave', () => {
			dropdownIsOpened = false;
			if (wScroll < showOffset) {
				hiddenHeader.classList.remove('--show');
			}
		});

		// Header anzeigen, wenn kein Element mit der Klasse "page_start" vorhanden ist
		if (
			!pageStart &&
			!document.querySelector('.header--shop') &&
			!document.querySelector('.home__banner')
		) {
			// hiddenHeader.classList.remove("--hidden-on-load");
		}
	}
}
