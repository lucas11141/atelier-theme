import $ from 'jquery';

export default function wooGlobal() {
	// Mobile Message swipe up
	let touchstartY = 0;
	let touchendY = 0;
	function handleGesture(item) {
		if (touchendY < touchstartY) {
			// Swipe Up
			item.classList.add('--swipe-up');
		}
		if (touchendY > touchstartY) {
			// Swipe Down
		}
	}

	document.querySelectorAll('.woocommerce-message, .woocommerce-error').forEach((item) => {
		item.addEventListener('touchstart', (e) => {
			touchstartY = e.changedTouches[0].screenY;
		});

		item.addEventListener('touchend', (e) => {
			touchendY = e.changedTouches[0].screenY;
			handleGesture(item);
		});

		item.addEventListener('touchmove', (e) => {
			e.preventDefault();
		});
	});

	if (document.querySelector('tr.subtotal')) {
		$('tr.subtotal').prev('tr').addClass('pre__subtotal');
	}

	//Warenkorb Neu laden bei Gutscheincode anpassungen
	jQuery(document.body).on('applied_coupon_in_checkout removed_coupon_in_checkout', function () {
		location.reload();
	});
}
