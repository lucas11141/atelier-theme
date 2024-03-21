import 'tippy.js/dist/tippy.css'; // optional for styling

import tippy from 'tippy.js';

export function tooltips() {
	tippy('.tooltip', {
		placement: 'bottom-end',
		theme: 'atelier',
		arrow: false,
		appendTo: 'parent',
		maxWidth: 250,
	});
}
