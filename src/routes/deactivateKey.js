const $ = require('cafy').default;
const MongoAdapter = require('../modules/MongoAdapter');

module.exports = async (context) => {
	return context.response.success();
};
