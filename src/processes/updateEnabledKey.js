const $ = require('cafy').default;

module.exports = async (enabled, context) => {

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

	// update enabled
	await context.db.updateById(context.config.mongo.collectionName, license._id, {
		enabled
	});

	return context.response.success();
};
