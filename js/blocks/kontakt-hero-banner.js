export default function kontaktHeroBanner() {
	/*------------------------------------*/
	/* 	Add options to course select
	/*------------------------------------*/
	const courseSelect = document.querySelector('select[name="course"]');
	const courseSelectOptions = document.querySelectorAll('#course-names li');

	// save all possible values of courseSelectOptions in an array (remove duplicates)
	const courseSelectOptionsGroups = [
		...new Set(Array.from(courseSelectOptions).map((option) => option.dataset.group)),
	];

	// split courseSelectOptions into arrays by group
	const courseSelectOptionsByGroup = courseSelectOptionsGroups.map((group) => {
		return Array.from(courseSelectOptions).filter((option) => option.dataset.group === group);
	});

	courseSelectOptionsByGroup.forEach((group) => {
		// create optgroup element
		const optgroupElement = document.createElement('optgroup');
		optgroupElement.label = group[0].dataset.gruppe;
		optgroupElement.dataset.group = group[0].dataset.group;

		group.forEach((option) => {
			// create option element
			const optionElement = document.createElement('option');
			optionElement.value = option.innerText;
			optionElement.innerText = option.innerText;
			optionElement.dataset.group = option.dataset.group;

			optgroupElement.appendChild(optionElement);
		});

		courseSelect.appendChild(optgroupElement);
	});

	/*------------------------------------*/
	/* 	Section Name
	/*------------------------------------*/

	const contactBanner = document.querySelector('.kontakt__banner');
	if (contactBanner) {
		let currentActive;
		var hasScrolled = false;
		const tabButtons = contactBanner.querySelectorAll('.methods__item');
		const tabContents = document.querySelectorAll('.methods__content');

		openTab(0, false);

		tabButtons.forEach((button) => {
			button.addEventListener('click', (e) => {
				openTab(e.target.dataset.index);
			});
		});

		function openTab(index, scroll = true) {
			// Hide Elements for no Selection
			tabButtons.forEach((button) => {
				button.classList.remove('--arrows');
			});
			document.querySelector('.form__dummy').style.display = 'none';

			// Highlight current Tab
			const activeTab = tabButtons[index];
			if (activeTab.dataset.index != currentActive) {
				tabButtons.forEach((button) => {
					button.classList.remove('--active');
				});
				activeTab.classList.add('--active');
			}
			currentActive = index;

			// Show current Tab Content
			tabContents.forEach((content) => {
				content.classList.add('--hidden');
				if (content.dataset.index == currentActive) {
					content.classList.remove('--hidden');
				}
			});

			// if (!hasScrolled && scroll) {
			// 	scrollView(
			// 		document.querySelector(".kontakt__methods"),
			// 		"top",
			// 		200
			// 	);
			// 	console.log("scroll");
			// 	hasScrolled = true;
			// }

			const schnupperForm = document.querySelector('.schnuppertermin');
			if (index == 1) adjustTextareaHeight(schnupperForm);
		}

		if (window.location.hash) {
			var hash = window.location.hash; // = "#login"
			hash = hash.substring(1);
			tabButtons.forEach((button) => {
				if (button.dataset.hash === hash) {
					button.classList.add('--active');
					openTab(button.dataset.index);
				}
			});
		}
	}

	// Schnuppertermin Formular
	const schnupperForm = document.querySelector('.schnuppertermin');
	if (schnupperForm) {
		initVariableForm(schnupperForm, courseSelect);
	}

	function initVariableForm(form, selectElement) {
		// Check if all parameters are defined
		if (!form) throw new Error('Es wurde kein Formular definiert.');
		if (!selectElement) throw new Error('Es wurde kein Select-Feld definiert.');

		adjustTextareaHeight(form);

		selectElement.addEventListener('change', (e) => {
			// get data-group attribute from selected option
			const group = e.target.options[e.target.selectedIndex].dataset.group;
			showToogleFields('group', group);

			const rows = form.querySelectorAll(
				'.form__split:first-child label:not(.--hidden)'
			).length;
			adjustTextareaHeight(form);
		});
	}

	function showToogleFields(dataAttribute, value) {
		document.querySelectorAll('.toggle__field').forEach((field) => {
			if (field.dataset[dataAttribute] === value) {
				field.classList.remove('--hidden');
			} else {
				field.classList.add('--hidden');
				field.querySelector('input').value = ''; // Reset Value
			}
		});
	}

	function adjustTextareaHeight(form) {
		const splitLeftHeight = form.querySelector('.form__split:first-child').offsetHeight;

		const textarea = form.querySelector("label[for='message']");
		textarea.style.height = splitLeftHeight + 'px';
	}
}
