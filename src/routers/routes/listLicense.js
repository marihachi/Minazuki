const $ = require('cafy').default;
const MongoAdapter = require('../../modules/MongoAdapter');

/** @param {{db:MongoAdapter}} context */
module.exports = async (context) => {
	// param: page
	const [page = 1, pageErr] = $.optional.number.min(1).get(context.params.page);
	if (pageErr) {
		return context.response.error('invalid_param', 400, { paramName: 'page' });
	}

	// param: limit
	const [limit = 30, limitErr] = $.optional.number.range(0, 1000).get(context.params.limit);
	if (limitErr) {
		return context.response.error('invalid_param', 400, { paramName: 'limit' });
	}

	let licenses;
	if (limit != 0) {
		licenses = await context.db.findArray(context.config.mongo.collectionNames.licenses, { }, { skip: limit*(page-1), limit: limit });
	}
	else {
		licenses = [];
	}

	const serialized = licenses.map(i => {
		return {
			key: i.key,
			enabled: i.enabled,
			activated: (i.activation != null)
		};
	});

	return context.response.success({ licenses: serialized });
};
