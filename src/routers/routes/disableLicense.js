const updateEnabledLicense = require('./processes/updateEnabledLicense');

/** @param {{db:MongoAdapter}} context */
module.exports = (context) => {
	return updateEnabledLicense(false, context);
};
