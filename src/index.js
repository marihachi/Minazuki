const path = require('path');
const loadConfig = require('./modules/loadConfig');
const MongoAdapter = require('./modules/MongoAdapter');
const express = require('express');
const bodyParser = require('body-parser');
const ApiResponse = require('./modules/ApiResponse');
const serverErrorHandler = require('./modules/serverErrorHandler');
const buildGeneralRouter = require('./routers/buildGeneralRouter');
const buildAdminRouter = require('./routers/buildAdminRouter');

async function entryPoint() {
	console.log('-------------');
	console.log(' Minazuki **');
	console.log(` v${require('../package.json').version}`);
	console.log('-------------');

	console.log('loading config...');

	let config;
	try {
		config = loadConfig();
	}
	catch (err) {
		console.log('failed to load config');
		return;
	}
	if (config.$version != 2) {
		console.log(`The config version '${config.$version}' is not supported. You need to use the version 2.`);
		return;
	}

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

	const server = express();
	server.disable('x-powered-by');
	server.use(bodyParser.json());

	// logging
	server.all('*', (req, res, next) => {
		console.log(`${req.method} ${req.path} `);
		next();
	});

	// static resource
	server.use('/', express.static('src/client.built'));

	// general router
	const generalRouter = buildGeneralRouter(config, db);
	server.use('/', generalRouter);

	// admin router
	const adminRouter = buildAdminRouter(config, db);
	server.use('/admin', adminRouter);

	// error: not found
	server.use((req, res) => {
		const apiRes = new ApiResponse(res);
		apiRes.error('not_found', 404);
	});

	server.use((err, req, res, next) => {
		if (err instanceof SyntaxError && err.message.indexOf('JSON') != -1) {
			const apiRes = new ApiResponse(res);
			apiRes.error('invalid_request', 400);
			return;
		}
		next();
	});

	// error handling
	server.use((err, req, res, next) => {
		serverErrorHandler(err, res);
	});

	// start listening
	server.listen(config.httpPort, () => {
		console.log(`listening on port: ${config.httpPort}`);
	});
}

entryPoint()
.catch(err => {
	console.log(err);
});
