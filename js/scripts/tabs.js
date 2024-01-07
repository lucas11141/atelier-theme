import $ from 'jquery';

export default function tabs() {
	// Hide all inactive tabs on load
	let tabName = $('.tab__link.--active').attr('data-tabID');
	$('.tab__content').hide();
	$('.tab__content#' + tabName).show();

	// Click function
	$('.tab__link').on('click', function () {
		tabName = $(this).data('tabid');
		console.log('tabName', tabName, $(this));
		//Hide the Actives
		$('.tab__content').hide();
		$('.tab__link').removeClass('--active');
		//Show the Selected
		$(this).addClass('--active');
		$('.tab__content#' + tabName).show();
	});
}
