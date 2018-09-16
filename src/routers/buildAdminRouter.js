const express = require('express');
const basicAuth = require('basic-auth');
const buildRouter = require('./buildRouter');

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

	// admin authentication
	router.use((req, res, next) => {
		if (req.body.username || req.body.password) {
			const validCredential = (
				req.body.username === config.basicAuth.username &&
				req.body.password === config.basicAuth.password);

			if (!validCredential) {
				res.status(401).send();
				console.log('failed to authenticate admin');
				return;
			}
		}
		else {
			const authData = basicAuth(req);
			const validCredential = (
				authData &&
				config.basicAuth.username === authData.name &&
				config.basicAuth.password === authData.pass);

			if (!validCredential) {
				res.set('WWW-Authenticate', 'Basic realm="admin area"');
				res.status(401).send();
				console.log('failed to authenticate admin');
				return;
			}
		}

		next();
	});

	return buildRouter(config, db, routes, router);
};
