/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
	// devtool: 'source-map', // Activate Sourcemaps
	mode: 'production', // Production mode minimizes the output
	stats: 'minimal', // Minimizes the console output to few line per compilation
	entry: './js/main.js', // The files to be compiled
	output: {
		filename: 'main.js', // The output file name
		path: path.resolve(__dirname, 'atelier_theme/assets/js'), // Output directory
	},
	module: {
		rules: [
			{
				// Add SCSS and CSS support
				test: /\.(scss|css)$/,
				use: [
					'style-loader',
					'css-loader',
					// 'sass-loader', // When scss is needed
				],
			},
			{
				test: /\.ts$/,
				loader: 'esbuild-loader',
				options: {
					target: 'es2015',
				},
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	plugins: [new ESLintPlugin()], // Add the ESLint plugin
};
