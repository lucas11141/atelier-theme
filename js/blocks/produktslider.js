import Swiper from 'swiper';
import { defaultSwiperPagination } from '../options/variables';

export function produktslider() {
	const productSliderElements = document.querySelectorAll('.produktslider .swiper');
	productSliderElements.forEach((sliderElement) => {
		// Main slider
		new Swiper(sliderElement, {
			slidesPerView: 'auto',
			spaceBetween: 20,

			// Modules
			keyboard: {
				enabled: true,
				onlyInViewport: false,
			},

			pagination: defaultSwiperPagination,

			navigation: {
				nextEl: sliderElement.querySelector('.slider__button.--next'),
				prevEl: sliderElement.querySelector('.slider__button.--prev'),
			},

			// Responsive
			breakpoints: {
				520: {
					slidesPerView: 2,
				},
				720: {
					slidesPerView: 3,
				},
			},
		});
	});
}
