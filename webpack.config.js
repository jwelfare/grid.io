/*
	./webpack.config.js
	author: jwelfare
	desc.: exported config object for webpack middleware. Defines entry point for client-side js
*/

module.exports = { 
	entry: __dirname + '/src/client.js',
	output: {
		path: '/',
		filename: 'client.js'
	},
	devtool: 'source-maps',
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015'],
				}
			}
		]
	}
}