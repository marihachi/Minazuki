const ApiResponse = require('./ApiResponse');

module.exports = (err, res) => {
	const apiRes = new ApiResponse(res);
	apiRes.error('server_error', 500);

	console.log('*** Server Error Log  ***');
	console.log(err);
};
