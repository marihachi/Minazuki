const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	entry: './src/client/entry.js',
	output: {
		path: `${__dirname}/src/client.built`,
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.js$/,
				loader: 'babel-loader?presets=es2015',
			},
		]
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			vue$: 'vue/dist/vue.esm.js',
		}
	},
	plugins: [
		new VueLoaderPlugin()
	]
}
