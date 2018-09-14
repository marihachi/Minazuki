class ApiResponse {
	constructor(res) {
		this.res = res;
	}

	success(data = null) {
		const resData = { success: true };

		if(typeof data === 'string') {
			resData.message = data;
		}
		else if (typeof data == 'object' && !Array.isArray(data)) {
			Object.assign(resData, data);
		}
		else if (data != null) {
			throw new TypeError('invalid response data');
		}
		this.res.json(resData);
		console.log('Success Response:', resData);
	}

	error(message, statusCode = 400, detail = null) {
		if(typeof message !== 'string') {
			throw new TypeError('invalid error message');
		}

		const error = { message };
		if (detail != null)
			error.detail = detail;

		const resData = {
			success: false,
			error: error
		};

		this.res.status(statusCode).json(resData);
		console.log('Error Response:', statusCode, message);
	}
}
module.exports = ApiResponse;
