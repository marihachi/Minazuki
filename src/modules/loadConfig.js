const path = require('path');

const loadConfig = () => {
	try {
		return require(path.resolve('config.json'));
	}
	catch(err) {
		throw new Error('config file is not found');
	}
};
module.exports = loadConfig;
