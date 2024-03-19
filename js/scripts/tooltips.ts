import 'tippy.js/dist/tippy.css'; // optional for styling

import tippy from 'tippy.js';

export function tooltips() {
	tippy('.tooltip', {
		// placement: 'bottom-start',
		placement: 'bottom',
		theme: 'atelier',
		arrow: false,
	});
}
