const loadConfig = require('./modules/loadConfig');
const MongoAdapter = require('./modules/MongoAdapter');
const express = require('express');
const bodyParser = require('body-parser');
const ApiResponse = require('./modules/ApiResponse');
const serverErrorHandler = require('./modules/serverErrorHandler');
const buildGeneralRouter = require('./routers/buildGeneralRouter');
const buildAdminRouter = require('./routers/buildAdminRouter');

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

	const server = express();
	server.set('port', process.env.PORT || 3000);
	server.disable('x-powered-by');
	server.use(bodyParser.json());

	// logging
	server.all('*', (req, res, next) => {
		console.log(`${req.method} ${req.path} `);
		next();
	});

	// general router
	const generalRouter = buildGeneralRouter(config, db);
	server.use(generalRouter);

	// admin router
	const adminRouter = buildAdminRouter(config, db);
	server.use(adminRouter);

	// error: not found
	server.use((req, res) => {
		const apiRes = new ApiResponse(res);
		apiRes.error('not_found', 404);
	});

	// error handling
	server.use((err, req, res, next) => {
		serverErrorHandler(err, res);
	});

	// start listening
	server.listen(config.port, () => {
		console.log(`listening on port: ${config.port}`);
	});

})().catch(err => {
	console.log(err);
});
