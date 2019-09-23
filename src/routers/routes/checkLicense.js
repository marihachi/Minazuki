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

	// expect: activated
	if (license.activation == null) {
		return context.response.error('not_activated');
	}

	// param: associationText
	const [associationText, associationTextErr] = $.string.get(context.params.associationText);
	if (associationTextErr) {
		return context.response.error('invalid_param', 400, { paramName: 'associationText' });
	}

	const correctAssociationHash = generateHash(`${associationText}${license.activation.salt}`);
	
	// expect: associationText equals to it was saved
	if (license.activation.associationHash != correctAssociationHash) {
		return context.response.error('different_association_text');
	}

	return context.response.success();
};
