const crypto = require('crypto');
const sha256 = crypto.createHash('sha256');
const generateHash = (value) => {
	sha256.update(value);
	return sha256.digest('hex').toUpperCase();
};
module.exports = generateHash;
