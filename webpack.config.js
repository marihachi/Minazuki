const VueLoaderPlugin = require('vue-loader/lib/plugin');

const i18nTable = {
	'ja': {
		'License Creation': 'ライセンスの作成',
		'Create': '作成'
	},
	'en': {
		'License Creation': 'License Creation',
		'Create': 'Create'
	}
};

const i18n = (langName) => {
	return Object.keys(i18nTable[langName]).map(word => {
		return { search: `{%${word}%}`, replace: i18nTable[langName][word] };
	});
};

const languageConfigs = Object.keys(i18nTable).map(langName => {
	return {
		entry: './src/client/entry.js',
		output: {
			path: `${__dirname}/src/client.built`,
			filename: `minazuki.${langName}.js`
		},
		module: {
			rules: [
				{
					test: /\.vue$/,
					loaders: [
						{ loader: 'vue-loader' },
						{
							loader: 'string-replace-loader',
							options: {
								multiple: i18n(langName)
							}
						}
					]
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
	};
});

module.exports = languageConfigs;
