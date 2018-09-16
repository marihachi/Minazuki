const buildRouter = require('./buildRouter');

module.exports = (config, db) => {
	const routes = [
		// associate license-key with user env
		{ endpoint: '/license/activate', module: 'activateLicense' },

		// disassociate license-key with user env
		{ endpoint: '/license/deactivate', module: 'deactivateLicense' },

		// check activation state
		{ endpoint: '/license/check', module: 'checkLicense' },
	];

	return buildRouter(config, db, routes);
};
