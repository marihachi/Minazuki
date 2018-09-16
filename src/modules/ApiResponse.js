class ApiResponse {
	constructor(res) {
		this.res = res;
	}

	success(content = null) {
		const resData = { success: true };

		if(typeof content === 'string') {
			resData.content = { message: content };
		}
		else if (content != null && typeof content == 'object' && !Array.isArray(content)) {
			resData.content = content;
		}
		else if (content != null) {
			throw new TypeError('invalid response data');
		}
		this.res.json(resData);
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
	}
}
module.exports = ApiResponse;
