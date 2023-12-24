const defaultSwiperPagination = {
	el: '.slider__pagination',
	clickable: true,
	clickableClass: '--clickable',
	bulletClass: 'slider__pagination__bullet',
	bulletActiveClass: '--active',
};

// Scroll Offset
const scrollOffset = window.innerWidth < 850 ? 120 : 150;

export { scrollOffset, defaultSwiperPagination };
