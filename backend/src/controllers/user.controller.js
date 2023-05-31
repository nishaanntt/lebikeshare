require('dotenv').config();
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const hashData = require('../utils/hashData');

// *** Change Password ***
exports.changePassword = catchAsyncErrors(async (req, res, next) => {
	const { password, newPassword, confirmPassword } = req.body;
	const userId = req.user._id;

	if (!password || !newPassword || !confirmPassword) {
		return next(new ErrorHandler('All fields required', 400));
	}

	if (newPassword.length < 8) {
		return next(
			new ErrorHandler('The password must be at least 8 characters.', 400)
		);
	}

	if (newPassword !== confirmPassword) {
		return next(new ErrorHandler('The passwords do not match.', 400));
	}

	const user = await User.findById(userId);
	if (!user) {
		return next(new ErrorHandler('User not found', 404));
	}

	const match = await bcrypt.compare(password, user.password);
	if (!match) {
		return next(new ErrorHandler('Invalid old password'));
	}

	const hashedPassword = await hashData(newPassword);
	user.password = hashedPassword;
	await user.save();

	res.status(200).json({
		message: 'Password updated successfully',
	});
});

// *** User Profile ***
exports.userProfile = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.params;
	console.log('id: ', id);

	const user = await User.findOne({ _id: id }).select(
		'firstName lastName email mobileNumber dateOfBirth address paymentMethods paymentPreference'
	);
	console.log('user: ', user);

	if (!user) {
		return next(new ErrorHandler());
	}

	res.status(200).json({
		user,
	});
});
