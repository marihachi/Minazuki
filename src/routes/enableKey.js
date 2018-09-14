const updateEnabledKey = require('../processes/updateEnabledKey');

module.exports = (context) => {
	return updateEnabledKey(true, context);
};
