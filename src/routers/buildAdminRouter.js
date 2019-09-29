const express = require('express');
const buildRouter = require('./buildRouter');
const ApiResponse = require('../modules/ApiResponse');
const $ = require('cafy').default;

module.exports = (config, db) => {
	const routes = [
		// create license
		{ endpoint: '/license/create', module: 'createLicense' },

		// list license
		{ endpoint: '/license/list', module: 'listLicense' },

		// enable license
		{ endpoint: '/license/enable', module: 'enableLicense' },

		// disable license
		{ endpoint: '/license/disable', module: 'disableLicense' },

		// delete license
		{ endpoint: '/license/delete', module: 'deleteLicense' }
	];

	const router = express.Router();

	if (config.adminWeb.enable) {
		router.get('/*', (req, res) => {
			res.render('page');
		});
	}

	// admin authentication
	router.use((req, res, next) => {
		const token = req.body.token;
		if ($.string.nok(token) || token !== config.adminWeb.token) {
			const apiRes = new ApiResponse(res);
			apiRes.error('not_authenticated', 401);
			return;
		}
		next();
	});

	return buildRouter(config, db, routes, router);
};
