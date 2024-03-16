import { disableScroll, enableScroll } from '../lib/helpers';

export function popup() {
	// Open popups
	const popupButtons = document.querySelectorAll('a.--open__popup');
	const popupButtonsSpan = document.querySelectorAll('a.--open__popup span');
	popupButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			disableScroll();
			e.preventDefault();
			const popup = e.target.dataset.popup;
			document.querySelector('.popup.--' + popup).classList.remove('--hidden');
		});
	});
	popupButtonsSpan.forEach((button) => {
		button.addEventListener('click', (e) => {
			disableScroll();
			e.preventDefault();
			const popup = e.target.parentElement.dataset.popup;
			document.querySelector('.popup.--' + popup).classList.remove('--hidden');
		});
	});

	// Close popups
	const popupCloseButtons = document.querySelectorAll('.popup .popup__close');
	const popupCloseButtonsImg = document.querySelectorAll('.popup .popup__close img');
	popupCloseButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			enableScroll();
			e.target.parentElement.parentElement.classList.add('--hidden');
		});
	});
	popupCloseButtonsImg.forEach((button) => {
		button.addEventListener('click', (e) => {
			enableScroll();
			e.target.parentElement.parentElement.parentElement.classList.add('--hidden');
		});
	});
}
