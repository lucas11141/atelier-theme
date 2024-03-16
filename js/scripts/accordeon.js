import $ from 'jquery';

export function accordeon() {
	// TODO - Change to css-only solution

	//Accordeon
	$('.accordeon__item .accordeon__header').on('click', function () {
		$(this).parent('.accordeon__item').toggleClass('accordeon__item--opened');
		const accordion_content = $(this).parent('.accordeon__item').find('.accordeon__content');
		// $('.accordeon__content').not(accordion_content).slideUp(200);
		$('.accordeon__item')
			.find('.accordeon__content')
			.not(accordion_content)
			.parent('.accordeon__item')
			.removeClass('accordeon__item--opened');
		// accordion_content.stop(true, true).slideToggle(200);
	});

	// //Erstes Item bei Laden der Seite geöffnet
	// $('.accordeon')
	// 	.not('.accordeon--closed')
	// 	.find('.accordeon__item')
	// 	.first()
	// 	.addClass('accordeon__item--opened');
	// $('.accordeon')
	// 	.not('.accordeon--closed')
	// 	.find('.accordeon__item')
	// 	.first()
	// 	.find('.accordeon__content')
	// 	.show();
}
