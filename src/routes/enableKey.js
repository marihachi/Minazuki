const updateEnabledKey = require('../processes/updateEnabledKey');

/** @param {{db:MongoAdapter}} context */
module.exports = (context) => {
	return updateEnabledKey(true, context);
};
