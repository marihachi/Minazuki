const $ = require('cafy').default;
const MongoAdapter = require('../modules/MongoAdapter');

/** @param {{db:MongoAdapter}} context */
module.exports = async (context) => {

	// param: page
	const [page = 1, pageErr] = $.number.optional.min(1).get(context.params.page);
	if (pageErr) {
		return context.response.error('invalid_param', 400, { paramName: 'page' });
	}

	// param: limit
	const [limit = 30, limitErr] = $.number.optional.range(1, 1000).get(context.params.limit);
	if (limitErr) {
		return context.response.error('invalid_param', 400, { paramName: 'limit' });
	}

	// list
	const licenses = await context.db.findArray(context.config.mongo.collectionName, { }, { skip: limit*(page-1), limit: limit });

	const serialized = licenses.map(i => {
		return {
			key: i.key,
			enabled: i.enabled,
			activation: i.activation
		};
	});

	return context.response.success({ keys: serialized });
};
