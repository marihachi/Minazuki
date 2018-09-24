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
		const { username, password } = config.basicAuth;

		if (req.body.username || req.body.password) {
			if (req.body.username !== username || req.body.password !== password) {
				res.status(401).send();
				console.log('failed to authenticate admin');
				return;
			}
		}
		else {
			const authData = basicAuth(req);
			if (!authData || authData.name !== username || authData.pass !== password) {
				res.set('WWW-Authenticate', 'Basic realm="admin area"');
				res.status(401).send();
				if (authData)
					console.log('failed to authenticate admin');
				return;
			}
		}
		next();
	});

	router.use(express.static('src/client.built'));

	return buildRouter(config, db, routes, router);
};
