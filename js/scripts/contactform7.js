jQuery(document).ready(function ($) {
	// Move the spinner into the submit button wrapper
	document
		.querySelectorAll("input[type='submit'].has-spinner")
		.forEach((input) => {
			// wrap input in div
			const wrapper = document.createElement("div");
			wrapper.classList.add("submit-wrapper");
			input.parentNode.insertBefore(wrapper, input);
			wrapper.appendChild(input);

			// remove all existim spinner elements ".wpcf7-spinner"
			const spinner = wrapper.nextSibling;
			spinner.remove();

			const newSpinner = document.createElement("div");
			newSpinner.classList.add("wpcf7-spinner");
			newSpinner.classList.add("loading-spinner");
			newSpinner.innerHTML =
				"<div></div><div></div><div></div><div></div>";
			wrapper.appendChild(newSpinner);
		});
});
