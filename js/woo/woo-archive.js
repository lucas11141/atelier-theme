export default function wooArchive() {
	// Truncate term description
	const termDescription = $('.term-description');
	if (termDescription && termDescription.text().length > 100) {
		termDescription.addClass('--hide-text');
		termDescription.append('<a class="show-more">Mehr lesen</a>');
		termDescription.find('.show-more').on('click', () => {
			termDescription.removeClass('--hide-text');
		});
	}

	const filterSlideOver = document.querySelector('.filters-slideover');

	if (!filterSlideOver) return;

	const filterSlideOverBackdrop = document.querySelector('.filters-slideover__backdrop');
	const filterButtons = document.querySelectorAll('.filters-slideover__button');
	const filterConfirmButton = document.querySelector('.filters-slideover__confirm .button');
	const closeButton = document.querySelector('.filters-slideover__close');

	filterButtons.forEach((button) => {
		button.addEventListener('click', () => {
			// filterButtons.forEach(btn => btn.classList.remove('active'));
			// button.classList.add('active');
			filterSlideOver.classList.add('--open');
			filterSlideOverBackdrop.classList.add('--open');
		});
	});

	filterSlideOverBackdrop.addEventListener('click', () => {
		filterSlideOver.classList.remove('--open');
		filterSlideOverBackdrop.classList.remove('--open');
	});

	filterConfirmButton.addEventListener('click', () => {
		filterSlideOver.classList.remove('--open');
		filterSlideOverBackdrop.classList.remove('--open');
	});

	closeButton.addEventListener('click', () => {
		filterSlideOver.classList.remove('--open');
		filterSlideOverBackdrop.classList.remove('--open');
	});
}
