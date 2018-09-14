const generateHash = require('../modules/generateHash');
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
	const license = await context.db.find(context.config.clollectionName, { key });
	if (license == null) {
		return context.response.error('invalid_param', 400, { paramName: 'key' });
	}

	// param: associationText
	const [associationText, associationTextErr] = $.string.get(context.params.associationText);
	if (associationTextErr) {
		return context.response.error('invalid_param', 400, { paramName: 'associationText' });
	}

	// check that enabled of license
	if (!license.enabled) {
		return context.response.error('disabled_license');
	}

	// check that not activated
	if (license.activation != null) {
		return context.response.error('already_activated');
	}

	const salt = Math.round(Math.random() * 1000000);

	license.activation = {
		associationHash: generateHash(`${associationText}${salt}`),
		salt: salt
	};

	// save activation of license
	await context.db.updateById(context.config.clollectionName, license._id, {
		$set: {
			activation: license.activation
		}
	});

	return context.response.success();
};
