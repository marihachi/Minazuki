const $ = require('cafy').default;
const MongoAdapter = require('../../modules/MongoAdapter');
const randomstring = require('randomstring');

/** @param {{db:MongoAdapter}} context */
module.exports = async (context) => {
	// param: enabled
	const [enabled = context.config.defaultLicenseEnabled, enabledErr] = $.optional.boolean.get(context.params.enabled);
	if (enabledErr) {
		return context.response.error('invalid_param', 400, { paramName: 'enabled' });
	}

	const key = randomstring.generate({ length: context.config.licenseKeyLength });

	// save
	await context.db.create(context.config.mongo.collectionName, {
		key: key,
		enabled: enabled,
		activation: null
	});

	return context.response.success({
		license: {
			key: key,
			enabled: enabled,
			activated: false
		}
	});
};
