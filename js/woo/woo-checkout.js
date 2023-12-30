// TODO: Fix the decimals for shipping
import $ from 'jquery';

export default function wooCheckout() {
	console.log('wooCheckout');
	// Erweitere die Click-Box input zum li Container
	document.querySelectorAll('.woocommerce-shipping-methods li').forEach((element) => {
		element.addEventListener('click', (e) => {
			e.currentTarget.querySelector('input').checked = true;
			jQuery('body').trigger('update_checkout');

			const label = e.currentTarget.querySelector('label').childNodes[0].nodeValue;
			$('.shipping__total .label').text(label);

			let amount = undefined;
			if (e.currentTarget.querySelector('.amount')) {
				amount =
					e.currentTarget.querySelector('.amount bdi').childNodes[0].nodeValue +
					'<span class="woocommerce-Price-currencySymbol">€</span>';
			}
			if (amount === undefined) {
				amount = 'Kostenlos!';
			}
			document.querySelector('.shipping__total .totals').innerHTML = amount;

			// Gesamtsumme ausrechen und anzeigen
			let subtotalEl = document.querySelector('.subtotal bdi');
			if (!subtotalEl) subtotalEl = document.querySelector('.cart-subtotal bdi');
			const subtotal = parseFloat(subtotalEl.childNodes[0].nodeValue.replace(',', '.'));
			const shipping = parseFloat(amount.replace(',', '.'));
			let total;
			if (isNaN(shipping)) {
				total = subtotal;
			} else {
				total = subtotal + shipping;
			}
			total = `${total}`.substring(0, 5).replace('.', ',');
			// always habe following format 0,00
			if (total.length === 1) {
				total = total + ',00';
			}
			if (total.length === 2) {
				total = total + ',00';
			}
			if (total.length === 3) {
				total = total + ',00';
			}
			if (total.length === 4) {
				total = total + '0';
			}
			document.querySelector(
				'.order-total bdi'
			).innerHTML = `${total} <span class="woocommerce-Price-currencySymbol">€</span>`;

			newElement = null;
			newElement = document.createElement('div');
			newElement.classList.add('shop_table__icon');
			newElement.classList.add('shop_table__icon--shipping');
			document.querySelector('.shipping__total th').prepend(newElement);
		});
	});

	let newElement;

	document.querySelectorAll('.cart-discount').forEach((element) => {
		newElement = document.createElement('div');
		newElement.classList.add('shop_table__icon');
		newElement.classList.add('shop_table__icon--discount');
		element.querySelector('th').prepend(newElement);
	});

	document.querySelectorAll('.woocommerce-remove-coupon').forEach((element) => {
		element.innerHTML = '<div class="icon--remove-coupon" title="Gutschein entfernen"></div>';
	});

	newElement = null;
	newElement = document.createElement('div');
	newElement.classList.add('shop_table__icon');
	newElement.classList.add('shop_table__icon--shipping');
	if (document.querySelector('.shipping__total th')) {
		document.querySelector('.shipping__total th').prepend(newElement);
	}
}