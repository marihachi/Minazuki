var merge = require('./object-merge');

var errorCodes = [];
errorCodes[1] = "Some parameters are required.";
errorCodes[2] = "Some parameters are invalid.";
errorCodes[3] = "You do not have permission."
errorCodes[4] = "You were suspended."
errorCodes[5] = "Internal error.";

exports.res = null;

exports.successResponse = function (message, data) {
	var resData = {};
	resData.is_success = true;
	resData.message = message;

	if(Object.prototype.toString.call(data) === '[object Object]')
		merge(resData, data);

	console.log(`Success: ${resData.message}`);
	exports.res.json(resData);
};

exports.errorResponse = function (errorCode) {
	var resData = {};
	resData.is_success = false;

	if (errorCode >= 1 && errorCode <= 7)
		resData.message = errorCodes[errorCode];
	else
		resData.message = "Unknown error";

	resData.error_code = errorCode;

	console.log(`Error: ${errorCode} ${resData.message}`);
	exports.res.json(resData);
};
