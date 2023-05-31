const catchAsyncErrors = require('./catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const authenticated = catchAsyncErrors(async (req, res, next) => {
	const authHeader = req.headers['authorization'];
	console.log('authHeader: ', authHeader);
	const token = authHeader && authHeader.split(' ')[1];
	console.log('token: ', token);

	if (!token) {
		return next(new ErrorHandler('Please login to access this resource.', 401));
	}

	const decodedData = jwt.verify(token, process.env.JWT_SECRET);
	console.log('decodedData: ', decodedData);

	req.user = await User.findById(decodedData.id);

	console.log('req.user ===> ', req.user);

	next();
});

module.exports = authenticated;
