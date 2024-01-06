export default function wooArchive() {
	console.log('Woo Archive');

	const filterSlideOver = document.querySelector('.filters-slideover');
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

	// // switch tag type of all .wpc-term-item-content-wrapper from div to label
	// const termItemContentWrappers = document.querySelectorAll('.wpc-term-item-content-wrapper');
	// termItemContentWrappers.forEach((div) => {
	// 	const classList = div.classList;
	// 	const label = document.createElement('label');
	// 	label.innerHTML = div.innerHTML;
	// 	label.classList = classList;

	// 	div.parentNode.replaceChild(label, div);
	// });
}
