const fs = require('fs').promises;
const $ = require('cafy').default;
const randomstring = require('randomstring');
const ConsoleUtil = require('./modules/ConsoleUtil');

async function init() {

	try {
		await fs.access('config.json');
		const allowedOverwrite = await ConsoleUtil.question('config.json is already exists. overwrite it? (y/N)', false);
		if (!allowedOverwrite) {
			return;
		}
	}
	catch (err) { }

	// tokenLength
	let tokenLength;
	do {
		console.log('Input the length of admin token (default: 64)');
		const tokenLengthStr = await ConsoleUtil.inputLine('> ');
		if (tokenLengthStr == '') {
			tokenLength = 64;
		}
		else {
			tokenLength = parseInt(tokenLengthStr, 10);
		}
	}
	while ($.number.int().range(1, 128).nok(tokenLength));

	const token = randomstring.generate(tokenLength);

	const configData = JSON.stringify({
		$version: 2,
		httpPort: 3000,
		mongo: {
			hostnameWithPort: "localhost:27017",
			dbName: "minazuki",
			collectionNames: {
				licenses: "licenses"
			},
			username: "username",
			password: "password"
		},
		adminWeb: {
			enable: true,
			token: token,
		},
		license: {
			defaultEnabled: true,
			keyLength: 24
		}
	}, null, '  ');

	await fs.writeFile('config.json', configData);
}

init()
.catch(err => {
	console.log(err);
});
