jQuery(document).ready(function ($) {
	document.addEventListener("wpcf7submit", (e) => {
		const form = e.target;

		const templateId = parseInt(
			form.querySelector(".standard__form").dataset.brevoTemplateId
		);

		if (!templateId)
			throw new Error(
				"This form does not have a brevo template id",
				form
			);

		// replace all references in fields with the child input, select or textarea
		const fields = form.querySelectorAll("label[data-brevo-param]");
		const inputs = [];

		fields.forEach((field) => {
			const input = field.querySelector("input, select, textarea");
			input.dataset.brevoParam = field.dataset.brevoParam;
			inputs.push(input);
		});

		if (e.target.dataset.status === "sent") {
			const params = getFormValues(inputs);

			// console.log("params", params);
			// brevoGetContact(params)
			// 	.then((res) => res.json())
			// 	.then((res) => {
			// 		console.log("brevoGetContact", res);
			// 		if (res.code === "document_not_found") {
			// 			console.log("create contact");
			// 			brevoCreateContact(params)
			// 				.then((response) => response.json())
			// 				.then((result) => {
			// 					console.log("brevoCreateContact", result);
			// 					const messageId = result.messageId;
			// 					const success = messageId ? true : false;
			// 					return success;
			// 				})
			// 				.catch((error) => console.error(error));
			// 		}
			// 	})
			// 	.catch((error) => console.error(error));

			// const isContactCreated = brevoCreateContact(params);
			// console.log("isContactCreated", isContactCreated);
			const isEmailSent = brevoSendEmail(templateId, params);

			// Add message to success message if sendinblue mail was sent
			if (isEmailSent) {
				const successMessage = form.querySelector(
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

	function getFormValues(inputs) {
		const params = {};

		// map over all inputs and add them to the params object. save values seperated by . into child objects
		inputs.forEach((input) => {
			const param = input.dataset.brevoParam;
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

	async function brevoGetContact(params) {
		const options = {
			method: "POST",
			headers: {
				accept: "application/json",
				"content-type": "application/json",
			},
			body: JSON.stringify(params),
		};

		return fetch(
			"/wp-content/themes/atelier_theme/functions/brevoGetContact.php",
			options
		);
	}

	async function brevoCreateContact(params) {
		const options = {
			method: "POST",
			headers: {
				accept: "application/json",
				"content-type": "application/json",
			},
			body: JSON.stringify(params),
		};

		return fetch(
			"/wp-content/themes/atelier_theme/functions/brevoCreateContact.php",
			options
		);
	}

	async function brevoSendEmail(templateId, params) {
		// console.log(templateId, params);

		const options = {
			method: "POST",
			headers: {
				accept: "application/json",
				"content-type": "application/json",
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

		fetch(
			"/wp-content/themes/atelier_theme/functions/brevoSendEmail.php",
			options
		)
			.then((response) => response.json())
			.then((result) => {
				// console.log(result);
				const messageId = result.messageId;
				const success = messageId ? true : false;
				console.log(success);
				return success;
			})
			.catch((error) => console.error(error));
	}
});
