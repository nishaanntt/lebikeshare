const moment = require('moment');

exports.validateName = value => {
	const regex = /^[a-zA-Z]*$/;
	return regex.test(value);
};

exports.validateAge = value => {
	const age = moment().diff(value, 'years', true);
	return age >= 18;
};

exports.validateUkMobileNumber = number => {
	const regex = /^(?:\+44|0)?(7\d{3}|\(0\)\s?\d{4})\s?\d{3}\s?\d{3}$/;
	return regex.test(number);
};
