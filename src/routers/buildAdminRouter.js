const express = require('express');
const basicAuth = require('basic-auth');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const csurf = require('csurf');
const buildRouter = require('./buildRouter');
const ApiResponse = require('../modules/ApiResponse');

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
	router.use(session({
		store: new MongoStore({
			client: db._client
		}),
		secret: config.sessionSecret,
		cookie: {
			httpOnly: true,
			maxAge: 7 * 24 * 60 * 60 * 1000 // 7days
		},
		resave: false,
		saveUninitialized: false
	}));
	router.use(csurf());

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

	router.get('/', (req, res) => {
		res.render('adminManage', {
			csrf: req.csrfToken()
		});
	});

	router.use(express.static('src/client.built'));

	// error: csrf token
	router.use((err, req, res, next) => {
		if (err.code !== 'EBADCSRFTOKEN') return next(err);
		const apiRes = new ApiResponse(res);
		apiRes.error(err.message);
	});

	return buildRouter(config, db, routes, router);
};
