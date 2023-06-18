// @prepros-prepend "../lib/swiper-bundle.min.js";

jQuery(document).ready(function ($) {
	const swiperAusstellung = new Swiper(".galerie__ausstellung .swiper", {
		slidesPerView: "auto",
		loop: false,
		autoplay: {
			delay: 10000,
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
			dynamicBullets: true,
			dynamicMainBullets: 3,
		},
		navigation: {
			nextEl: ".swiper__next",
			prevEl: ".swiper__prev",
		},
		on: {
			afterInit: function () {
				setTimeout(function () {
					const ausstellungElement = document.querySelector(
						".galerie__ausstellung"
					);
					const styling = document.createElement("style");
					styling.innerText = `
						.galerie__ausstellung .swiper-slide-active { height: 600px !important; width: 660px !important; padding-right:60px !important; }
						.galerie__ausstellung.right .swiper-slide-active { padding-right:40px !important; }
						.galerie__ausstellung.right .swiper-slide-prev { padding-right:60px !important; width:260px !important; }
						@media only screen and (max-width: 1030px) {
							.galerie__ausstellung .swiper-slide-active { width:calc(100vw - 330px) !important; height:calc(100vw - 330px - 60px) !important; }
						}
						@media only screen and (max-width: 850px) {
							.galerie__ausstellung .swiper-slide-active { width:600px !important; height:600px !important; padding-right:20px !important; }
							.galerie__ausstellung.right .swiper-slide-active { padding-right:20px !important; }
							.galerie__ausstellung.right .swiper-slide-prev { padding-right:20px !important; width:250px !important; }
						}
						@media only screen and (max-width: 680px) {
							.galerie__ausstellung .swiper-slide-active { width:calc(100vw - (2 * 15px) - 20px) !important; height:calc(100vw - (2 * 15px) - 20px - 20px) !important; }
						}`;
					ausstellungElement.append(styling);
				}, 1000);
			},
		},
	});
});
