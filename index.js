var express = require('express');
var http = require('http');
var bodyParser = require('body-parser')
var mysql = require('mysql');
var path = require('path');
var responseBuilder = require('./helpers/response-builder');
var config = require('./config');

var app = express();

/*var connection = mysql.createConnection({
  host : config.mysql.hostName,
  user : config.mysql.userName,
  password : config.mysql.password,
  database : config.mysql.dbName,
});

connection.connect(function(err) {
	if (err) {
		console.error('database error connecting: ' + err.stack);
		return;
	}
	console.log('database connected as id ' + connection.threadId);
});*/

console.log('Lisence Box');

app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
	responseBuilder.res = res;
	res.successResponse = responseBuilder.successResponse;
	res.errorResponse = responseBuilder.errorResponse;
	next();
});

app.all('*', function (req, res, next) {
	console.log(`${req.method} ${req.path} `);
	next();
});

app.get('/', function (req, res) {
	res.send('Lisence Box');
});

app.all('/activate', require('./routes/activate'));
app.all('/deactivate', require('./routes/deactivate'));

http.createServer(app).listen(app.get('port'), function () {
	console.log(`Start listening on port ${app.get('port')}`);
});
