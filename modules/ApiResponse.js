const errorCodes = [];
errorCodes[0] = 'Some parameters are required.';
errorCodes[1] = 'Some parameters are invalid.';
errorCodes[2] = 'You do not have permission.'
errorCodes[3] = 'You were suspended.'
errorCodes[4] = 'Internal error.';

class ApiResponse {
	constructor(res) {
		this.res = res;
	}

	success(data) {
		const resData = { isSuccess: true };

		if(typeof data === 'string') {
			resData.message = data;
		}
		else if (typeof data == 'object' && !Array.isArray(data)) {
			Object.assign(resData, data);
		}
		else {
			throw new TypeError('invalid response data');
		}

		this.res.json(resData);
		console.log(`Success Response:`, resData);
	}

	error(errorCode) {
		const resData = { isSuccess: false, errorCode };

		if (errorCode >= 0 && errorCode < errorCodes.length) {
			resData.message = errorCodes[errorCode];
		}
		else {
			resData.message = 'Unknown error';
			throw new TypeError('unknown response error code');
		}

		this.res.json(resData);
		console.log('Error Response:', errorCode, resData.message);
	}
}
module.exports = ApiResponse;
