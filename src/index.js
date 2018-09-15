const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('basic-auth');
const MongoAdapter = require('./modules/MongoAdapter');
const ApiResponse = require('./modules/ApiResponse');
const loadConfig = require('./modules/loadConfig');

const serverErrorHandler = (err, res) => {
	const apiRes = new ApiResponse(res);
	apiRes.error('server_error', 500);

	console.log('*** Server Error Log  ***');
	console.log(err);
};

(async () => {
	console.log('-------------');
	console.log(' Minazuki **');
	console.log(` v${require('../package.json').version}`);
	console.log('-------------');

	console.log('loading config...');
	const config = loadConfig();

	console.log('connecting db...');
	let db;
	const dbConfig = config.mongo;
	try {
		db = await MongoAdapter.connect(
			dbConfig.hostnameWithPort,
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
		// associate license-key with user env
		{ endpoint: '/license/activate', module: './routes/activateLicense' },

		// disassociate license-key with user env
		{ endpoint: '/license/deactivate', module: './routes/deactivateLicense' },

		// check activation state
		{ endpoint: '/license/check', module: './routes/checkLicense' },
	];

	for (const route of routes) {
		const func = require(route.module);

		router.post(route.endpoint, (req, res) => {
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

	// admin routings

	const adminRouter = express.Router();

	adminRouter.use((req, res, next) => {
		const authData = basicAuth(req);
		if (!authData || config.basicAuth.username !== authData.name || config.basicAuth.password !== authData.pass) {
			res.set('WWW-Authenticate', 'Basic realm="admin area"');
			res.status(401).send();
			console.log('failed to authenticate admin');
			return;
		}
		next();
	});

	const adminRoutes = [
		// create license
		{ endpoint: '/license/create', module: './routes/createLicense' },

		// list license
		{ endpoint: '/license/list', module: './routes/listLicense' },

		// enable license
		{ endpoint: '/license/enable', module: './routes/enableLicense' },

		// disable license
		{ endpoint: '/license/disable', module: './routes/disableLicense' },

		// delete license
		{ endpoint: '/license/delete', module: './routes/deleteLicense' }
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

	app.use(adminRouter);

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
		console.log(`listening on port: ${config.port}`);
	});
})().catch(err => {
	console.log(err);
});
