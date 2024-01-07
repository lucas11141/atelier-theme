import { disableScroll, enableScroll } from '../lib/helpers';

import $ from 'jquery';

export default function navigation() {
	let dropdownIsOpened = false;
	const hamburgers = document.querySelectorAll('.hamburger');

	$('.hamburger').on('click', function () {
		hamburgers.forEach((hamburger) => {
			hamburger.classList.toggle('is-active');
		});
		$('.header__dropdown').slideToggle(0);
		$('.header__dropdown').toggleClass('header__dropdown--opened');
		$('.header__dropdown').parent().toggleClass('--dropdown-opened');
		if (dropdownIsOpened) {
			dropdownIsOpened = false;
			enableScroll();
		} else {
			dropdownIsOpened = true;
			disableScroll();
		}
	});

	// close dropdown on resize when window is bigger than 850px
	window.addEventListener('resize', () => {
		if (window.innerWidth > 850) {
			hamburgers.forEach((hamburger) => {
				hamburger.classList.remove('is-active');
			});
			$('.header__dropdown').slideUp(100);
			$('.header__dropdown').removeClass('header__dropdown--opened');
			$('.header__dropdown').parent().removeClass('--dropdown-opened');
			dropdownIsOpened = false;
			enableScroll();
		}
	});

	// Nav mit Unterpunkten bekommt eine Klasse
	$('.dropdown__nav li').find('UL').parent().addClass('has-sub');
	$('.dropdown__nav ul li').each(function () {
		var hasSubnav = $(this).find('ul').length;
		if (hasSubnav >= 1) {
			$(this).prepend('<div class="showSub" />');
		}
	});

	//
	$('.showSub').on('click', function () {
		$(this).toggleClass('open');
		$(this).parent('li').toggleClass('open');
		$(this).parent('li').children('.sub-menu').slideToggle(200);
	});

	$('.header__dropdown__mobile .dropdown__links__item .submenu').each((index, element) => {
		if ($(element).find('li').length > 0) {
			$(element).parent().addClass('hasSub');
		}
	});

	$('.header__dropdown__mobile .hasSub .main-link').on('click', function (e) {
		e.preventDefault();
		$(this).parent().toggleClass('--opened');
		$(this).parent().find('.submenu:not(:empty)').slideToggle(300);
	});
}
