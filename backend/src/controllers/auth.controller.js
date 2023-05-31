require('dotenv').config();
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendVerificationEmail = require('../utils/sendVerificationEmail');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const hashData = require('../utils/hashData');
const UserVerification = require('../models/UserVerification.model');
const generatePassword = require('../utils/generatePassword');
const sendEmail = require('../utils/sendEmail');

// *** Register User ***
exports.register = catchAsyncErrors(async (req, res, next) => {
	const { firstName, lastName, email, mobileNumber, dateOfBirth, address } =
		req.body;

	const newUser = await User.create({
		firstName,
		lastName,
		email,
		mobileNumber,
		dateOfBirth,
		address,
		verified: false,
	});

	if (!newUser) {
		return next(new ErrorHandler());
	}

	const emailData = await sendVerificationEmail(newUser);

	res.status(201).json({
		message: `Verification email sent. Verification pending.`,
		data: emailData,
	});
});

// *** Register Admin ***
exports.registerAdmin = catchAsyncErrors(async (req, res, next) => {
	const { firstName, lastName, email, mobileNumber, dateOfBirth, address } =
		req.body;

	const newUser = await User.create({
		firstName,
		lastName,
		email,
		mobileNumber,
		dateOfBirth,
		address,
		verified: false,
		role: 'admin',
	});

	if (!newUser) {
		return next(new ErrorHandler());
	}

	const emailData = await sendVerificationEmail(newUser);

	res.status(201).json({
		message: `Verification email sent. Verification pending.`,
		data: emailData,
	});
});

// *** Login ***
exports.login = catchAsyncErrors(async (req, res, next) => {
	let { email, password } = req.body;

	if (!email || !password) {
		return next(new ErrorHandler('Please enter email and password', 400));
	}

	const user = await User.findOne({ email }).select(
		'firstName lastName email verified role password '
	);
	console.log('user: ', user);

	if (user) {
		if (!user.password) {
			return next(new ErrorHandler('Invalid email or password', 404));
		}

		const hashedPassword = user.password;
		const isValidPassword = await bcrypt.compare(password, hashedPassword);
		if (!isValidPassword) {
			return next(new ErrorHandler('Invalid email or password', 404));
		}

		let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: '24h',
		});
		res.status(200).json({
			message: 'Login successful.',
			user,
			token,
		});
	} else {
		return next(new ErrorHandler('Invalid email or password', 401));
	}
});

// *** Verify User ***
exports.verifyEmail = catchAsyncErrors(async (req, res, next) => {
	const { userId, uniqueString } = req.params;

	const successAnimation =
		'https://assets10.lottiefiles.com/packages/lf20_b7jmnbkv.json';
	const errorAnimation =
		'https://assets10.lottiefiles.com/temp/lf20_QYm9j9.json';

	if (!userId || !uniqueString) {
		const response = {
			message: `<h2>Invalid user details.</h2>`,
			url: errorAnimation,
		};
		res.render('emailVerification', {
			message: response.message,
			url: response.url,
		});
	}

	const unverifiedUser = await UserVerification.findOne({ userId });

	if (!unverifiedUser) {
		const response = {
			message: `<h2>User does not exist or has been verified already. Please register or log in.</h2>`,
			url: errorAnimation,
		};
		res.render('emailVerification', {
			message: response.message,
			url: response.url,
		});
	}

	const { expiresAt } = unverifiedUser;
	const hashedUniqueString = unverifiedUser.uniqueString;

	if (expiresAt < Date.now()) {
		await UserVerification.deleteOne({ userId });
		await User.deleteOne({ _id: userId });

		const response = {
			message: `<h2>The link has expired. Please register again.</h2>`,
			url: errorAnimation,
		};
		res.render('emailVerification', {
			message: response.message,
			url: response.url,
		});
	}

	const isValidUniqueString = await bcrypt.compare(
		uniqueString,
		hashedUniqueString
	);

	if (!isValidUniqueString) {
		const response = {
			message: `<h2>Invalid verification details.</h2>`,
			url: errorAnimation,
		};
		res.render('emailVerification', {
			message: response.message,
			url: response.url,
		});
	}
	await User.updateOne({ _id: userId }, { verified: true });
	await UserVerification.deleteOne({ userId });

	const password = generatePassword();
	console.log('password: ', password);

	const hashedPassword = await hashData(password);

	await User.updateOne({ _id: userId }, { password: hashedPassword });

	const user = await User.findOne({ _id: userId });

	const mailOptions = {
		from: process.env.AUTH_EMAIL,
		to: user.email,
		subject: `Your LeBikeShare Password`,
		html: `<p>Dear ${user.firstName},</p><p>You have been successfully registered at LeBikeShare. Your generated password is:</p><p><b><em>${password}</em></b></p><p>Kindly keep the password safe and do not share it with anybody.</p><p>Kind regards,</p><p>Team LeBikeShare</p>`,
	};

	await sendEmail(mailOptions);

	res.render('emailVerification', {
		message: `<h2>Your email has been verified.</h2><h4>Thank you for registering with LeBikeShare. Here's to a healthier and greener future!</h4>\n<h4>Please check your inbox for your password.</h4>`,
		url: successAnimation,
	});
});

// *** Resend Verification Email ***
exports.resendVerificationEmail = catchAsyncErrors(async (req, res, next) => {
	const { userId, email } = req.body;

	if (!userId || !email) {
		return next(new ErrorHandler('Invalid user details.', 401));
	}

	const unverifiedUser = await UserVerification.findOne({ userId });
	console.log('unverifiedUser: ', unverifiedUser);

	if (unverifiedUser) {
		await UserVerification.deleteMany({ userId });
		sendVerificationEmail({ _id: userId, email }, res);

		res.status(201).json({
			message: 'Verification email resent. Check your inbox.',
		});
	} else {
		return next(
			new ErrorHandler(
				'User does not exist or has been verified already. Please register or log in.',
				404
			)
		);
	}
});

// *** Forgot Password ***
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
	const { email } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		return next(new ErrorHandler('User not found', 404));
	}

	const resetToken = await user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	if (!resetToken) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });
		return next(new ErrorHandler());
	}

	const mailOptions = {
		from: process.env.AUTH_EMAIL,
		to: user.email,
		subject: `Reset Password`,
		html: `<p>Dear ${user.firstName},</p><p>We have received a request to reset your password. Please use the below OTP to reset your password:</p><p><b>${resetToken}</b></p>`,
	};

	await sendEmail(mailOptions);

	res.status(200).json({
		message: 'OTP sent on registered email.',
		resetToken,
	});
});

// *** Reset Password ***
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
	const { token, password, confirmPassword } = req.body;

	if (!token) {
		new ErrorHandler('Invalid or expired Reset Password Token', 400);
	}

	if (!password || !confirmPassword) {
		return next(new ErrorHandler('Please enter a valid password', 400));
	}

	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(token)
		.digest('hex');

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(
			new ErrorHandler('Invalid or expired Reset Password Token', 400)
		);
	}

	if (password !== confirmPassword) {
		return next(new ErrorHandler('The passwords do not match', 400));
	}

	if (password.length < 8) {
		return next(
			new ErrorHandler('The password must be at least 8 characters long', 400)
		);
	}

	const hashedPassword = await hashData(password);

	user.password = hashedPassword;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	res.status(200).json({
		message: 'Password reset successfully. Continue to login.',
	});
});
