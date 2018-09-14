const { MongoClient, ObjectId } = require('mongodb');
const { MissingArgumentsError } = require('./errors');

class MongoAdapter {
	/**
	 * @param {MongoClient} client
	 * @param {string} dbName
	*/
	constructor(client, dbName) {
		if (client == null) {
			throw new MissingArgumentsError();
		}
		this._client = client;
		this._db = client.db(dbName);
	}

	/**
	 * ドキュメントを作成します
	 *
	 * @param {String} collectionName コレクション名
	 * @param {Object} data
	 * @return {Promise<any>}
	*/
	async create(collectionName, data) {
		if (collectionName == null || data == null) {
			throw new MissingArgumentsError();
		}

		const result = await this._db.collection(collectionName).insert(data);
		const document = await this.find(collectionName, { _id: result.ops[0]._id });

		return document;
	}

	/**
	 * ドキュメントを検索して1つの項目を取得します
	 *
	 * @param {String} collectionName
	 * @param {Object} query
	 * @param {Object} options
	 * @return {Promise<any>}
	*/
	find(collectionName, query, options) {
		if (collectionName == null || query == null) {
			throw new MissingArgumentsError();
		}

		return this._db.collection(collectionName).findOne(query, options);
	}

	/**
	 * ドキュメントIDによりドキュメントを検索して1つの項目を取得します
	 *
	 * @param {String} collectionName
	 * @param {String|ObjectId} id
	 * @param {Object} options
	*/
	findById(collectionName, id, options) {
		if (id == null)
			throw new MissingArgumentsError();

		return this.find(collectionName, { _id: MongoAdapter.buildId(id) }, options);
	}

	/**
	 * ドキュメントを検索して複数の項目を取得します
	 *
	 * @param {String} collectionName
	 * @param {Object} query
	 * @param {{isAscending: Boolean, limit: Number, since: ObjectId, until: ObjectId}} options
	*/
	async findArray(collectionName, query, options) {
		if (collectionName == null || query == null) {
			throw new MissingArgumentsError();
		}

		options = options || {};

		if (options.since != null || options.until != null) {
			query._id = {};
		}
		if (options.since != null) {
			query._id.$gt = options.since;
		}
		if (options.until != null) {
			query._id.$lt = options.until;
		}

		let cursor = this._db.collection(collectionName).find(query);

		if (options.limit != null)
			cursor = cursor.limit(options.limit);

		if (options.isAscending != null)
			cursor = cursor.sort(MongoAdapter._buildSortOption(options.isAscending));

		const documents = await cursor.toArray();

		return documents;
	}

	/**
	 * クエリに一致するドキュメントの個数を取得します
	 *
	 * @param {String} collectionName
	 * @param {Object} query
	*/
	async count(collectionName, query) {
		if (collectionName == null || query == null) {
			throw new MissingArgumentsError();
		}

		const documentsCount = await this._db.collection(collectionName).count(query);

		return documentsCount;
	}

	/**
	 * ドキュメントを更新します
	 *
	 * @param {String} collectionName
	 * @param {Object} query
	 * @param {Object} data
	 * @param {Object} options
	*/
	async update(collectionName, query, data, options) {
		if (collectionName == null || query == null || data == null) {
			throw new MissingArgumentsError();
		}

		if (options == null) options = {};

		const result = await this._db.collection(collectionName).updateOne(query, options.renewal ? data : { $set: data }, options);

		if (result.result.ok != 1) {
			throw new Error('failed to update a database document');
		}

		const document = await this.find(collectionName, query);

		return document;
	}

	updateById(collectionName, id, data, options) {
		if (id == null) {
			throw new MissingArgumentsError();
		}

		return this.update(collectionName, { _id: MongoAdapter.buildId(id) }, data, options);
	}

	upsert(collectionName, query, data, options) {
		if (options == null)
			options = {};

		options.upsert = true;

		return this.update(collectionName, query, data, options);
	}

	/**
	 * ドキュメントを削除します
	 *
	 * @param {string} collectionName
	 * @param {Object} query
	 * @param {Object} options
	 * @return {Promise<void>}
	*/
	async remove(collectionName, query, options) {
		if (collectionName == null || query == null) {
			throw new MissingArgumentsError();
		}

		await this._db.collection(collectionName).remove(query, options);
	}

	removeById(collectionName, id, options) {
		if (options == null)
			options = {};

		return this.remove(collectionName, { _id: MongoAdapter.buildId(id) }, options);
	}

	async drop(collectionName, options) {
		if (collectionName == null) {
			throw new MissingArgumentsError();
		}

		await this._db.collection(collectionName).drop(options);
	}

	disconnect() {
		return this._client.close();
	}

	/**
	 * MongoDBに接続します
	 *
	 * @param {string} host
	 * @param {string} dbname
	 * @param {string?} username
	 * @param {string?} password
	 * @return {Promise<MongoAdapter>}
	*/
	static async connect(host, dbname, username, password) {
		if (host == null || dbname == null) {
			throw new MissingArgumentsError();
		}

		let authentication = '';
		if (username != null && password != null && username != '' && password != '') {
			authentication = `${username}:${password}@`;
		}

		const client = await MongoClient.connect(`mongodb://${authentication}${host}/${dbname}`);

		return new MongoAdapter(client, dbname);
	}

	static buildId(idSource) {
		if (!MongoAdapter.validateId(idSource))
			return null;

		return new ObjectId(idSource);
	}

	static validateId(id) {
		return ObjectId.isValid(id);
	}

	static _buildSortOption(isAscending) {
		return { $natural: (isAscending ? 1 : -1) };
	}
}
module.exports = MongoAdapter;
