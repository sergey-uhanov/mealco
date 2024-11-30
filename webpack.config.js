const webpack = require('webpack');

module.exports = {
	mode: 'production',
	output: {
		filename: 'main.bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'], // Добавление обработки CSS
			},
		],
	},
};
