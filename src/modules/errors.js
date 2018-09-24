class MissingArgumentsError extends Error {
	constructor() {
		super('missing arguments');
	}
}

module.exports = {
	MissingArgumentsError
};
