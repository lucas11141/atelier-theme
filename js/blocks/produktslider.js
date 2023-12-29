import { Keyboard, Navigation, Pagination } from 'swiper/bundle';

import Swiper from 'swiper';
import { defaultSwiperPagination } from '../options/variables';

export default function produktslider() {
	// Install the Swiper modules
	Swiper.use([Pagination, Navigation, Keyboard]);

	const productSliderElements = document.querySelectorAll('.produktslider .swiper');
	productSliderElements.forEach((sliderElement) => {
		// Main slider
		const slider = new Swiper(sliderElement, {
			slidesPerView: 3,
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
		});
	});
}
