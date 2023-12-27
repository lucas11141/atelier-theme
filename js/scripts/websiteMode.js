export default function websiteMode() {
	const websiteMode = document.querySelector('#gtm-values').dataset.websiteMode;

	if (websiteMode === 'shop') {
		// add url parameter websiteMode to all links
		document.querySelectorAll('.nav--law a').forEach((link) => {
			if (link.href.indexOf('?') > -1) {
				link.href += '&websiteMode=' + websiteMode;
			} else {
				link.href += '?websiteMode=' + websiteMode;
			}
		});
	}
}
