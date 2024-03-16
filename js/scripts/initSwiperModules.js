import { A11y, Autoplay, Keyboard, Navigation, Pagination, Thumbs } from 'swiper/modules';

import Swiper from 'swiper';

export function initSwiperModules() {
	// Swiper.use([Navigation, Pagination, Keyboard, Scrollbar, A11y]);
	Swiper.use([Pagination, Navigation, Keyboard, Autoplay, Thumbs, A11y]);
}