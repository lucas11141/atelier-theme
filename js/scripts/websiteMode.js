export default function websiteMode() {
	const websiteMode = document.querySelector('#website-mode').dataset.websiteMode;

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

	/*------------------------------------*/
	/* 	Google Analytics
    /*------------------------------------*/

	// add content group to tag manager data layer
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({
		content_group: websiteMode,
	});
}
