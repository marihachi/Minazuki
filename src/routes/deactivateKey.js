const $ = require('cafy').default;
const MongoAdapter = require('../modules/MongoAdapter');

/** @param {{db:MongoAdapter}} context */
module.exports = async (context) => {
	// param: key
	const [key, keyErr] = $.string.get(context.params.key);
	if (keyErr) {
		return context.response.error('invalid_param', 400, { paramName: 'key' });
	}

	// find license by key
	const license = await context.db.find(context.config.mongo.collectionName, { key });
	if (license == null) {
		return context.response.error('invalid_param', 400, { paramName: 'key' });
	}

	// check that enabled of license
	if (!license.enabled) {
		return context.response.error('disabled_license');
	}

	// check that activated
	if (license.activation == null) {
		return context.response.error('not_activated');
	}

	// save activation of license
	await context.db.updateById(context.config.mongo.collectionName, license._id, {
		$set: {
			activation: null
		}
	});

	return context.response.success();
};
