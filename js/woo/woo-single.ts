/*------------------------------------*/
/* Woocommerce Single Page */
/*------------------------------------*/

import 'photoswipe/style.css';

import PhotoSwipe, { PreparedPhotoSwipeOptions } from 'photoswipe';

import $ from 'jquery';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import Swiper from 'swiper';
import { defaultSwiperPagination } from '../options/variables';

export function wooSingle() {
	if (!document.querySelector('.single-product')) return;

	const galleryElements = document.querySelectorAll('.single-product .product-gallery');
	galleryElements.forEach((galleryElement) => {
		/*------------------------------------*/
		/* NOTE: Init sliders */
		/*------------------------------------*/

		// Thumbnail slider
		const thumbsSliderElement = galleryElement.querySelector(
			'.thumbs-slider'
		) as HTMLElement | null;
		if (!thumbsSliderElement) throw new Error('Thumbs slider not found');
		const thumbsSlider = new Swiper(thumbsSliderElement, {
			spaceBetween: 15,
			slidesPerView: 4,
			freeMode: true,
			watchSlidesProgress: true,
		});

		// Main slider
		const mainSliderElement = galleryElement.querySelector(
			'.main-slider'
		) as HTMLElement | null;
		if (!mainSliderElement) throw new Error('Main slider not found');
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
		/* NOTE: Part 2 of 2 PhotoSwipe v5 */
		/*------------------------------------*/
		/* https://photoswipe.com/getting-started/ */

		const photo_swipe_options: Partial<PreparedPhotoSwipeOptions> = {
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

		// Sync the main slider with the lightbox
		lightbox.on('change', () => {
			const { pswp } = lightbox;
			mainSlider.slideTo(pswp.currIndex, 0, false);
		});

		/*------------------------------------*/
		/* NOTE - Product gallery image swap */
		/*------------------------------------*/

		// List of attributes to watch and change slide on select
		const enabledAttributes = ['stil'];

		const variationForm = document.querySelector('.variations_form');
		const variations = JSON.parse(variationForm.dataset.product_variations);
		const variationOptions = variationForm.querySelectorAll('.variations tr');

		// console.log('variations', variations);
		const selections: {
			attribute_name: string;
			attribute_value: string;
		}[] = [];

		// Get the selected variation
		function getSelectedVariant() {
			const enabledSelections = enabledAttributes.map((attributeName) => {
				return selections.find(
					(selection) => selection.attribute_name === `attribute_pa_${attributeName}`
				);
			});

			const selectedVariant = variations.find((variation) => {
				return enabledSelections.every((selection) => {
					return (
						variation.attributes[selection.attribute_name] === selection.attribute_value
					);
				});
			});

			return selectedVariant;
		}

		function slideToVariation(url: string) {
			const slideIndex = mainSlider.slides.findIndex((slide) => {
				return slide.querySelector('img').dataset.src === url;
			});

			if (slideIndex === -1) throw new Error('Slide not found');

			// Scroll to the slide
			mainSlider.slideTo(slideIndex);
		}

		function updateSelection(attributeName: string, attributeValue: string) {
			// Update the selection
			const attribute = selections.find(
				(selection) => selection.attribute_name === `attribute_pa_${attributeName}`
			);

			if (!attribute) {
				selections.push({
					attribute_name: `attribute_pa_${attributeName}`,
					attribute_value: attributeValue,
				});
			}

			if (attribute.attribute_value === attributeValue) return;

			attribute.attribute_value = attributeValue;
		}

		$('.variations .label label').append('<span></span>');
		function updateLabel(attributeName: string, attributeValue: string) {
			// Get label for attribute
			const label = variationForm.querySelector(
				`.variations label[for="pa_${attributeName}"]`
			);
			const labelSpan = label?.querySelector('span');

			// first letter to uppercase
			labelSpan.innerHTML = attributeValue.charAt(0).toUpperCase() + attributeValue.slice(1);
		}

		variationOptions.forEach((option) => {
			const attribute = option.querySelector('.tawcvs-swatches') as HTMLElement;
			if (!attribute) throw new Error('Swatches not found');
			const attributeName = attribute.dataset.attribute_name.replace('attribute_pa_', '');
			let isLoading = false;

			// Observe if class selected has been added to swatch
			const observer = new MutationObserver(() => {
				if (isLoading) return;

				const selectedSwatch = attribute.querySelector('.swatch.selected') as HTMLElement;
				const selectedValue = selectedSwatch ? selectedSwatch.dataset.value : '';

				updateLabel(attributeName, selectedValue);

				// Only observe enabled attributes
				if (!enabledAttributes.includes(attributeName)) return;
				updateSelection(attributeName, selectedValue);

				const selectedVariant = getSelectedVariant();
				if (!selectedVariant) return;

				// Slide to image
				slideToVariation(selectedVariant.image.src);

				isLoading = true;
				setTimeout(() => {
					isLoading = false;
				}, 100);
			});

			observer.observe(attribute, {
				attributeFilter: ['class'],
				childList: true,
				subtree: true,
			});
		});
	});
}
