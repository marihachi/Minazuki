const express = require('express');
const path = require('path');
const ApiResponse = require('../modules/ApiResponse');
const serverErrorHandler = require('../modules/serverErrorHandler');

/** @param {express.Router} router */
module.exports = (config, db, routes, router = null) => {
	if (router == null) {
		router = express.Router();
	}

	// register all routes
	for (const route of routes) {
		const func = require(path.resolve(__dirname, 'routes', route.module));

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

	return router;
};
