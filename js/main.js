import 'swiper/css/bundle';

import {
	accordeon,
	brevo,
	contactForm7,
	form,
	initSwiperModules,
	navigation,
	newsletterPopup,
	popup,
	settings,
	tabs,
	websiteMode,
} from './scripts';
import {
	bookingReminder,
	kontaktHeroBanner,
	productFilter,
	produktslider,
	shopHeroBanner,
} from './blocks';
import { wooArchive, wooCheckout, wooGlobal, wooOrder, wooSingle } from './woo';

import lightbox from './lib/lightbox';

// @prepros-prepend "lib/jquery.magnific-popup.min.js";
// @prepros-prepend "lib/mc-calendar.min.js";

(function ($) {
	$(function () {
		/*------------------------------------*/
		/* Prepend */
		/*------------------------------------*/
		websiteMode();

		/*------------------------------------*/
		/* scripts.js */
		/*------------------------------------*/
		initSwiperModules();
		settings();
		navigation();
		accordeon();
		form();
		popup();
		tabs();

		/*------------------------------------*/
		/* Woocommerce */
		/*------------------------------------*/
		wooSingle();
		wooCheckout();
		wooOrder();
		wooArchive();
		wooGlobal();

		/*------------------------------------*/
		/* Blocks */
		/*------------------------------------*/
		productFilter();
		kontaktHeroBanner();
		bookingReminder();
		produktslider();
		shopHeroBanner();

		/*------------------------------------*/
		/* Lib */
		/*------------------------------------*/
		lightbox();

		/*------------------------------------*/
		/* Scripts */
		/*------------------------------------*/
		brevo();
		contactForm7();
		newsletterPopup();
	});
})(jQuery);
