const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  	entry: './src/index.ts',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Output Management',
		}),
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		static: path.resolve(__dirname, 'build'),
		compress: true,
		port: 3000,
	},
};