const readLine = require('readline');

class ConsoleUtil {
	/**
	 * @param {string} message
	 * @returns {Promise<string>}
	*/
	static inputLine(message) {
		return new Promise((resolve) => {
			const rl = readLine.createInterface(process.stdin, process.stdout);
			rl.question(message, (ans) => {
				resolve(ans);
				rl.close();
			});
		});
	}

	/**
	 * @param {string} str
	 * @param {boolean} defaultValue
	 * @returns {Promise<boolean>}
	*/
	static async question(str, defaultValue) {
		const input = (await ConsoleUtil.inputLine(str)).toLowerCase();
		if (input.indexOf('y') != 0 && input.indexOf('n') != 0) return defaultValue;
		return input.indexOf('y') == 0;
	}
}

module.exports = ConsoleUtil;
