const MongoAdapter = require('../modules/MongoAdapter');
const randomstring = require('randomstring');

/** @param {{db:MongoAdapter}} context */
module.exports = async (context) => {

	const key = randomstring.generate({ length: 24 });

	// create license document
	await context.db.create(context.config.mongo.collectionName, {
		key: key,
		enabled: context.config.defaultLicenseEnabled,
		activation: null
	});

	return context.response.success({ key });
};
