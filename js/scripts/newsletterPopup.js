import Cookies from 'js-cookie';

export default function newsletterPopup() {
	const popupNewsletter = document.querySelector('.popup--newsletter');
	console.log(Cookies.get('newsletter_opened'), typeof Cookies.get('newsletter_opened'));

	if (popupNewsletter) {
		setTimeout(function () {
			if (Cookies.get('newsletter_opened') !== 'true') {
				popupNewsletter.showModal();
			}
		}, 1000 * 20);

		popupNewsletter.addEventListener('close', () => {
			Cookies.set('newsletter_opened', 'true', { expires: 30 });
		});
	}
}
