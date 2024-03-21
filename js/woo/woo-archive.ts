function clampDesription() {
	// Truncate term description
	const description = document.querySelector('.term-description') as HTMLElement;
	if (!description) return;

	const text = description.querySelector('p') as HTMLElement;
	if (!text) return;

	const isClamped = text.offsetHeight < text.scrollHeight;

	// Add show more button if term description is too long
	if (isClamped) {
		const showMoreButton = document.createElement('a');
		showMoreButton.textContent = 'Mehr lesen';
		showMoreButton.classList.add('show-more');

		description.appendChild(showMoreButton);

		showMoreButton.addEventListener('click', () => {
			description.classList.add('--show-full');
			showMoreButton.remove();
		});
	}
}
function filterSlideover() {
	const filterSlideOver = document.querySelector('.filters-slideover');

	if (!filterSlideOver) return;

	const filterSlideOverBackdrop = document.querySelector('.filters-slideover__backdrop');
	const filterButtons = document.querySelectorAll('.filters-slideover__button');
	const filterConfirmButton = document.querySelector('.filters-slideover__confirm .button');
	const closeButton = document.querySelector('.filters-slideover__close');

	filterButtons.forEach((button) => {
		console.log('filterButtons', button);
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

export function wooArchive() {
	clampDesription();
	filterSlideover();
}
