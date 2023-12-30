import $ from 'jquery';

export default function wooOrder() {
	// Move elements to split left
	if (document.querySelector('.tracking-detail')) {
		$('.shipping__status').append($('.tracking-detail'));
	}

	// Remove .order__controls when height is 0
	if ($('.order__controls').height() === 0) {
		$('.order__controls').remove();
	}

	/*------------------------------------*\
    // order review - move elements to split left
	\*------------------------------------*/
	if (document.querySelector('.woocommerce-thankyou-order-details')) {
		$('.checkout-split .left .container').prepend($('.woocommerce-thankyou-order-details'));
	}
	if (document.querySelector('.woocommerce-thankyou-order-received')) {
		$('.checkout-split .left .container').prepend($('.woocommerce-thankyou-order-received'));
	}
}
