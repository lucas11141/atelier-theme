jQuery(document).ready(function ($) {
	document
		.querySelectorAll(".standard__form[data-sib-template-id]")
		.forEach((form) => {
			const templateId = parseInt(form.dataset.sibTemplateId);

			// replace all references in fields with the child input, select or textarea
			const fields = form.querySelectorAll("label[data-sib-param]");
			const inputs = [];

			fields.forEach((field) => {
				const input = field.querySelector("input, select, textarea");
				input.dataset.sibParam = field.dataset.sibParam;
				inputs.push(input);
			});

			document.addEventListener("wpcf7submit", (e) => {
				if (e.target.dataset.status === "sent") {
					const params = getFormValues(inputs);
					const isEmailSent = sibSendEmail(templateId, params);

					// Add message to success message if sendinblue mail was sent
					if (isEmailSent) {
						const successMessage = form.parentElement.querySelector(
							".wpcf7-response-output"
						);
						setTimeout(() => {
							successMessage.innerHTML =
								successMessage.innerHTML +
								" Du hast eine Bestätigungs-Mail erhalten.";
						}, 500);
					}
				}
			});
		});

	function getFormValues(inputs) {
		const params = {};

		// map over all inputs and add them to the params object. save values seperated by . into child objects
		inputs.forEach((input) => {
			const param = input.dataset.sibParam;
			const value = input.value;
			const splitParam = param.split(".");

			if (splitParam.length > 1) {
				const childParam = splitParam[0];
				const childValue = splitParam[1];

				if (!params[childParam]) {
					params[childParam] = {};
				}

				params[childParam][childValue] = value;
			} else {
				params[param] = value;
			}
		});

		// split name into firstname and lastname
		if (params.customer.name) {
			const fullname = params.customer.name;
			const splitName = fullname.split(" ");
			params.customer.firstname = splitName[0];
			params.customer.lastname = "";
			splitName.forEach((part, index) => {
				if (index >= 1) {
					params.customer.lastname =
						params.customer.lastname + " " + part;
				}
			});
			params.customer.lastname = params.customer.lastname.substring(1);
		}

		return params;
	}

	async function sibSendEmail(templateId, params) {
		const options = {
			method: "POST",
			headers: {
				accept: "application/json",
				"content-type": "application/json",
				"api-key":
					"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",
			},
			body: JSON.stringify({
				to: [
					{
						email: params.customer.email,
						name: `${params.customer.firstname} ${params.customer.lastname}`,
					},
				],
				bcc: [
					{
						email: "info@atelier-delatron.de",
						name: "Frauke Delatron",
					},
				],
				templateId,
				params,
			}),
		};
		let result;
		await fetch("https://api.sendinblue.com/v3/smtp/email", options)
			.then((response) => response.json())
			.then((response) => (result = response))
			.catch((err) => console.error(err));

		return result.messageId ? true : false;
	}

	async function sib(templateId, params) {
		const options = {
			method: "POST",
			headers: {
				accept: "application/json",
				"content-type": "application/json",
				"api-key":
					"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",
			},
			body: JSON.stringify({
				to: [
					{
						email: params.customer.email,
						name: `${params.customer.firstname} ${params.customer.lastname}`,
					},
				],
				bcc: [
					{
						email: "info@atelier-delatron.de",
						name: "Frauke Delatron",
					},
				],
				templateId,
				params,
			}),
		};
		let result;
		await fetch("https://api.sendinblue.com/v3/smtp/email", options)
			.then((response) => response.json())
			.then((response) => (result = response))
			.catch((err) => console.error(err));

		return result.messageId ? true : false;
	}
});
