const VueLoaderPlugin = require('vue-loader/lib/plugin');

const bootloader = {
	entry: './src/client/bootloader.js',
	output: {
		path: `${__dirname}/src/client.built`,
		filename: `bootloader.js`
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: { presets: 'es2015' }
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['.js']
	},
};

const i18nTable = {
	'ja': {
		'LicenseManagement': 'ライセンスの管理',
		'Create': '作成',
		'Delete': '削除',
		'Reload': 'リロード',
		'Enable': '有効化',
		'Disable': '無効化'
	},
	'en': {
		'LicenseManagement': 'License Management',
		'Create': 'Create',
		'Delete': 'Delete',
		'Reload': 'Reload',
		'Enable': 'Enable',
		'Disable': 'Disable'
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
					use: [
						{ loader: 'vue-loader' },
						{
							loader: 'string-replace-loader',
							options: { multiple: i18n(langName) }
						}
					]
				},
				{
					test: /\.scss$/,
					use: [
						{ loader: 'vue-style-loader' },
						{ loader: 'css-loader' },
						{ loader: 'sass-loader' }
					]
				},
				{
					test: /\.js$/,
					use: [
						{
							loader: 'babel-loader',
							options: { presets: 'es2015' }
						}
					]
				}
			]
		},
		resolve: {
			extensions: ['.js', '.vue'],
			alias: { vue$: 'vue/dist/vue.esm.js', }
		},
		plugins: [
			new VueLoaderPlugin()
		]
	};
});

module.exports = [bootloader, ...languageConfigs];
