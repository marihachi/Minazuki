const $ = require('cafy').default;
const MongoAdapter = require('../../modules/MongoAdapter');

/** @param {{db:MongoAdapter}} context */
module.exports = async (context) => {
	// param: key
	const [key, keyErr] = $.string.get(context.params.key);
	if (keyErr) {
		return context.response.error('invalid_param', 400, { paramName: 'key' });
	}

	// find license by key
	const license = await context.db.find(context.config.mongo.collectionNames.licenses, { key });
	if (license == null) {
		return context.response.error('invalid_param', 400, { paramName: 'key' });
	}

	// expect: enabled
	if (!license.enabled) {
		return context.response.error('disabled_license');
	}

	// expect: activated
	if (license.activation == null) {
		return context.response.error('not_activated');
	}

	// save
	await context.db.updateById(context.config.mongo.collectionNames.licenses, license._id, {
		activation: null
	});

	return context.response.success();
};
