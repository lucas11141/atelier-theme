import { Autoplay, Navigation, Thumbnail } from 'swiper/bundle';

import Swiper from 'swiper';

export default function shopHeroBanner() {
	// Install the Swiper modules
	Swiper.use([Autoplay, Navigation, Thumbnail]);

	const shopHeroBannerBlocks = document.querySelectorAll('.shop-hero-banner');
	shopHeroBannerBlocks?.forEach((block) => {
		let isPlaying = true;

		const processBar = block.querySelector('.process-button .process');
		const processButton = block.querySelector('.process-button');

		const textSliderElement = block.querySelector('.text-slider');
		const textSlider = new Swiper(textSliderElement.querySelector('.swiper'), {
			slidesPerView: 1,
			allowTouchMove: false,
			effect: 'fade',
			fadeEffect: {
				crossFade: true,
			},
		});

		const imageSliderElement = block.querySelector('.image-slider');
		const imageSlider = new Swiper(imageSliderElement.querySelector('.swiper'), {
			slidesPerView: 1,
			loop: true,

			autoplay: {
				delay: 15000,
				// disableOnInteraction: false,
			},

			// Modules
			thumbs: {
				swiper: textSlider,
			},
			navigation: {
				nextEl: imageSliderElement.querySelector('button.--next'),
				prevEl: imageSliderElement.querySelector('button.--prev'),
				disabledClass: '--disabled',
			},
		});

		/*------------------------------------*/
		/* Event Listeners */
		/*------------------------------------*/
		processButton.addEventListener('click', () => {
			if (isPlaying) {
				imageSlider.autoplay.pause();
				processButton.classList.add('--paused');
				isPlaying = false;
			} else {
				imageSlider.autoplay.resume();
				processButton.classList.remove('--paused');
				isPlaying = true;
			}
		});

		imageSlider.on('slideChange', () => {
			processButton.classList.remove('--filled');

			setTimeout(() => {
				processButton.classList.add('--filled');
			}, 1);
		});

		processBar.addEventListener('animationend', () => {
			imageSlider.slideNext();
		});
	});
}
