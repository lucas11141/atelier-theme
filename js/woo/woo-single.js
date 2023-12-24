/*------------------------------------*/
/* Woocommerce Single Page */
/*------------------------------------*/

import 'photoswipe/style.css';

import { Navigation, Pagination } from 'swiper/bundle';

import PhotoSwipe from 'photoswipe';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import Swiper from 'swiper';
import { defaultSwiperPagination } from '../options/variables';

export default function wooSingle() {
	// Install the Swiper modules
	Swiper.use([Pagination, Navigation]);

	const galleryElements = document.querySelectorAll('.single-product .product-gallery');
	galleryElements.forEach((galleryElement) => {
		// Thumbnail slider
		const thumbsSliderElement = galleryElement.querySelector('.thumbs-slider');
		const thumbsSlider = new Swiper(thumbsSliderElement, {
			spaceBetween: 15,
			slidesPerView: 4,
			freeMode: true,
			watchSlidesProgress: true,
		});

		// Return if the slider is not found
		if (!thumbsSlider) return;

		// Main slider
		const mainSliderElement = galleryElement.querySelector('.main-slider');
		const mainSlider = new Swiper(mainSliderElement, {
			loop: true,

			navigation: {
				nextEl: mainSliderElement.querySelector('.slider__button.--next'),
				prevEl: mainSliderElement.querySelector('.slider__button.--prev'),
			},

			pagination: defaultSwiperPagination,

			thumbs: {
				swiper: thumbsSlider,
			},
		});

		/*------------------------------------*/
		/* Part 2 of 2 PhotoSwipe v5 */
		/*------------------------------------*/
		/* https://photoswipe.com/getting-started/ */

		const photo_swipe_options = {
			gallery: mainSliderElement,
			pswpModule: PhotoSwipe,
			// set background opacity
			bgOpacity: 1,
			showHideOpacity: true,
			children: 'a',
			loop: true,
			showHideAnimationType: 'zoom' /* options: fade, zoom, none */,

			/* Click on image moves to the next slide */
			imageClickAction: 'close',
			tapAction: 'close',

			/* ## Hiding a specific UI element ## */
			zoom: false,
			close: true,
			counter: true,
			arrowKeys: true,
			/* ## Options ## */
			bgOpacity: '0.8' /* deafult: 0.8 */,
			wheelToZoom: true /* deafult: undefined */,
		};

		const lightbox = new PhotoSwipeLightbox(photo_swipe_options);

		lightbox.init();

		lightbox.on('change', () => {
			const { pswp } = lightbox;
			mainSlider.slideTo(pswp.currIndex, 0, false);
		});
	});

	// $('.woocommerce-product-gallery').each(function () {
	// 	// Add required DOM Structure
	// 	// $(this).append('<div class="slider__controls"></div>')
	// 	// $(this).find('.slider__controls').append('<div class="slider__arrows"></div>')

	// 	// Init slider
	// 	$(this)
	// 		.find('.woocommerce-product-gallery__wrapper')
	// 		.slick({
	// 			autoplay: false,
	// 			speed: 200,
	// 			slidesToShow: 1,
	// 			slidesToScroll: 1,
	// 			draggable: true,
	// 			mobileFirst: true,

	// 			arrows: false,
	// 			// arrows: true,
	// 			// appendArrows: $(this).find('.slider__arrows'),
	// 			dots: true,
	// 			// appendDots: $(this).find('.slider__controls'),

	// 			responsive: [
	// 				{
	// 					breakpoint: 768,
	// 					settings: 'unslick',
	// 				},
	// 			],
	// 		});
	// });
}
