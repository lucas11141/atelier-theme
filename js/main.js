import 'swiper/css/bundle';

import accordeon from './scripts/accordeon';
import bookingReminder from './blocks/booking-reminder';
import brevo from './scripts/brevo';
import contactForm7 from './scripts/contactform7';
import form from './scripts/form';
import kontaktHeroBanner from './blocks/kontakt-hero-banner';
import lightbox from './lib/lightbox';
import navigation from './scripts/navigation';
import newsletterPopup from './scripts/newsletterPopup';
import popup from './scripts/popup';
import productFilter from './blocks/productfilter';
import produktslider from './blocks/produktslider';
import settings from './scripts/settings';
import shopHeroBanner from './blocks/shopHeroBanner';
import tabs from './scripts/tabs';
import websiteMode from './scripts/websiteMode';
import wooArchive from './woo/woo-archive';
import wooCheckout from './woo/woo-checkout';
import wooOrder from './woo/woo-order';
import wooSingle from './woo/woo-single';

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
