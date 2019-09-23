const $ = require('cafy').default;
const MongoAdapter = require('../../modules/MongoAdapter');
const generateHash = require('../../modules/generateHash');

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

	// expect: not activated
	if (license.activation != null) {
		return context.response.error('already_activated');
	}

	// param: associationText
	const [associationText, associationTextErr] = $.string.get(context.params.associationText);
	if (associationTextErr) {
		return context.response.error('invalid_param', 400, { paramName: 'associationText' });
	}

	const salt = Math.round(Math.random() * 1000000);
	const associationHash = generateHash(`${associationText}${salt}`);

	license.activation = { associationHash, salt };

	// save
	await context.db.updateById(context.config.mongo.collectionNames.licenses, license._id, {
		activation: license.activation
	});

	return context.response.success();
};
