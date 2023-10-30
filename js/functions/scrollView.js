export default function scrollView(element, align = 'top', margin = 0) {
	const screenElementHeightDelta = window.innerHeight - element.offsetHeight;

	if (align === 'center') {
		if (screenElementHeightDelta < margin * 2) {
			// align top with margin when screen is to small
			window.scrollTo({
				behavior: 'smooth',
				top:
					element.getBoundingClientRect().top -
					document.body.getBoundingClientRect().top -
					margin,
			});
		} else {
			// align element in center
			element.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	} else if (align === 'top') {
		window.scrollTo({
			behavior: 'smooth',
			top:
				element.getBoundingClientRect().top -
				document.body.getBoundingClientRect().top -
				margin,
		});
	} else if (align === 'bottom') {
		const rect = element.getBoundingClientRect();
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		const offsetTop = rect.top + scrollTop;
		const wHeight = window.innerHeight;
		const elHeight = rect.height;
		const scollOffset = offsetTop - (wHeight - elHeight - margin);
		console.log(elHeight);
		console.log(offsetTop);
		window.scrollTo({
			behavior: 'smooth',
			top: scollOffset,
		});
	}
}
