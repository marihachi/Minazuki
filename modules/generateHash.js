const crypto = require('crypto');

const generateHash = (value) => {
	const sha256 = crypto.createHash('sha256');
	sha256.update(value);
	return sha256.digest('hex').toUpperCase();
};
module.exports = generateHash;
