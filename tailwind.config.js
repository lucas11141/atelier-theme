module.exports = {
	content: [
		"**/*.html",
		"**/*.php",
		"**/*.js",
		"!wp-admin",
		"!wp-includes",
		"!node_modules",
		"!Prepros Export",
	],
	theme: {
		extend: {
			colors: {
				transparent: "transparent",
				current: "currentColor",
				main: "var(--color-main)",
			},
			boxShadow: {
				calendar: "2px 2px 12px 0px rgba(0, 0, 0, 0.06)",
			},
		},
	},
	safelist: ["bg-red-500", "text-3xl", "lg:text-4xl"],
};
