/*------------------------------------*/
/* Woocommerce Single Page */
/*------------------------------------*/

import 'photoswipe/style.css';

import $ from 'jquery';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import Swiper from 'swiper';
import { defaultSwiperPagination } from '../options/variables';

export function wooSingle() {
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

		// // Return if the slider is not found
		// if (!thumbsSlider) return;

		// Main slider
		const mainSliderElement = galleryElement.querySelector('.main-slider');
		const mainSlider = new Swiper(mainSliderElement, {
			loop: true,

			navigation: {
				nextEl: mainSliderElement.querySelector('.slider__button.--next'),
				prevEl: mainSliderElement.querySelector('.slider__button.--prev'),
			},

			pagination: defaultSwiperPagination,

			thumbs: thumbsSliderElement ? { swiper: thumbsSlider } : undefined,
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
			// bgOpacity: '0.8' /* deafult: 0.8 */,
			wheelToZoom: true /* deafult: undefined */,
		};

		const lightbox = new PhotoSwipeLightbox(photo_swipe_options);

		lightbox.init();

		lightbox.on('change', () => {
			const { pswp } = lightbox;
			mainSlider.slideTo(pswp.currIndex, 0, false);
		});
	});

	/*------------------------------------*/
	/* Variation swatches */
	/*------------------------------------*/
	let selectedName = $('.swatch.selected').parent().find('.swatch__tooltip').text();
	$('.variations .label label').append('<span></span>');
	updateVariationTooltip();

	function updateVariationTooltip() {
		setTimeout(function () {
			$('.variations .label span').html('');
			$('.swatch.selected').each(function () {
				selectedName = $(this).parent().find('.swatch__tooltip').text();
				$('.variations .label span').html(selectedName);
			});
		}, 50);
	}

	$('.reset_variations').on('click', updateVariationTooltip);
	$('.swatch').on('click', updateVariationTooltip);
}
