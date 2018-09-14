const express = require('express');
const bodyParser = require('body-parser');
const MongoAdapter = require('./modules/MongoAdapter');
const ApiResponse = require('./modules/ApiResponse');
const basicAuth = require('basic-auth');

const serverErrorHandler = (err, res) => {
	const apiRes = new ApiResponse(res);
	apiRes.error('server_error', 500);

	console.log('*** Server Error Log  ***');
	console.log(err);
};

const loadConfig = () => {
	try {
		return require('./config');
	}
	catch(err) {
		try {
			return require('../config');
		}
		catch(err2) {
			throw new Error('config file is not found');
		}
	}
};

(async () => {
	console.log('Simple Activation System "Minazuki"');
	console.log();

	console.log('loading config...');
	const config = loadConfig();

	console.log('connecting database...');
	let db;
	const dbConfig = config.mongo;
	try {
		db = await MongoAdapter.connect(
			dbConfig.hostName,
			dbConfig.dbName,
			dbConfig.username,
			dbConfig.password);
	}
	catch (err) {
		console.log('failed to connect database');
		console.log(err);
		return;
	}

	console.log('initializing...');
	const app = express();

	app.set('port', process.env.PORT || 3000);
	app.disable('x-powered-by');
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	// logging
	app.all('*', (req, res, next) => {
		console.log(`${req.method} ${req.path} `);
		next();
	});

	// general routings

	const router = express.Router();

	const routes = [
		// associate key with user env
		{ endpoint: '/key/activate', module: './routes/activateKey' },

		// disassociate key with user env
		{ endpoint: '/key/deactivate', module: './routes/deactivateKey' }
	];

	for (const route of routes) {
		const func = require(route.module);

		router.post(route.endpoint, (req, res) => {
			const params = {};
			Object.assign(params, req.query);
			Object.assign(params, req.body);

			console.log(params);

			func({
				config: config,
				db: db,
				params: params,
				response: new ApiResponse(res)
			}).catch(err => {
				serverErrorHandler(err, res);
			});
		});
	}

	// admin routings

	const adminRouter = express.Router();

	adminRouter.use((req, res, next) => {
		const authData = basicAuth(req);
		if (!authData || config.adminAuth.username !== authData.name || config.adminAuth.password !== authData.pass) {
			res.set('WWW-Authenticate', 'Basic realm="admin area"');
			res.status(401).send();
			console.log('failed to authenticate admin');
			return;
		}
		next();
	});

	const adminRoutes = [
		// [For admin] get key
		{ endpoint: '/admin/key/get', module: './routes/getKey' },

		// [For admin] create key
		{ endpoint: '/admin/key/create', module: './routes/createKey' },

		// [For admin] disable key
		{ endpoint: '/admin/key/disable', module: './routes/disableKey' }
	];

	for (const route of adminRoutes) {
		const func = require(route.module);

		adminRouter.post(route.endpoint, (req, res) => {
			const params = {};
			Object.assign(params, req.query);
			Object.assign(params, req.body);

			func({
				config: config,
				db: db,
				params: params,
				response: new ApiResponse(res)
			}).catch(err => {
				serverErrorHandler(err, res);
			});
		});
	}

	// register routes

	app.use(router);

	app.use('/admin', adminRouter);

	app.use((req, res) => {
		const apiRes = new ApiResponse(res);
		apiRes.error('not_found', 404);
	});

	// error handling
	app.use((err, req, res, next) => {
		serverErrorHandler(err, res);
	});

	// start listening
	app.listen(config.port, () => {
		console.log(`Start listening on ${config.port} port`);
	});
})().catch(err => {
	console.log(err);
});
