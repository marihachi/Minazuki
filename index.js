const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const responseBuilder = require('./helpers/response-builder');
const config = require('./config');

/*const connection = mysql.createConnection({
	host : config.mysql.hostName,
	user : config.mysql.userName,
	password : config.mysql.password,
	database : config.mysql.dbName,
});

connection.connect((err) => {
	if (err) {
		console.error('database error connecting: ' + err.stack);
		return;
	}
	console.log('database connected as id ' + connection.threadId);
});*/

console.log('Simple Activation System "Minazuki"');

const app = express();

app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));

// logging
app.all('*', (req, res, next) => {
	console.log(`${req.method} ${req.path} `);
	next();
});

// register api endpoint
const api = (method, path, func) => {
	app[method](path, (req, res) => {
		func({
			params: req.params,
			query: req.query,
			body: req.body,
			response: new ApiResponse(res)
		});
	});
};

// [For management] get key
api('get', '/keys/:keyId', require('./routes/getKey'));

// [For management] enable key
api('post', '/keys/:keyId/enable', require('./routes/enableKey'));

// [For management] disable key
api('post', '/keys/:keyId/disable', require('./routes/disableKey'));

// associate key with user env
api('post', '/keys/:keyId/activate', require('./routes/activateKey'));

// disassociate key with user env
api('post', '/keys/:keyId/deactivate', require('./routes/deactivateKey'));

app.listen(app.get('port'), () => {
	console.log(`Start listening on ${app.get('port')} port`);
});
