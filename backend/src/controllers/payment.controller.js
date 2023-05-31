require('dotenv');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Booking = require('../models/Booking.model');
const User = require('../models/User.model');
const ErrorHandler = require('../utils/errorHandler');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// *** GET PAYMENT DETAILS ***
exports.getPaymentDetails = catchAsyncErrors(async (req, res, next) => {
	const { bookingId } = req.params;
	const userId = req.user;

	const booking = await Booking.findOne({ _id: bookingId });

	if (!booking) {
		return next(new ErrorHandler('Booking not found', 404));
	}

	const user = User.findOne({ _id: userId });

	if (!user) {
		return next(new ErrorHandler('User not found', 404));
	}

	if (booking.status == 'Pending Payment') {
	} else {
		return next(new ErrorHandler('Cannot fetch payment details', 400));
	}
});

// *** PAYMENT INTENT ***
exports.paymentIntent = catchAsyncErrors(async (req, res, next) => {
	const { amount } = req.body;

	const paymentIntent = await stripe.paymentIntents.create({
		amount,
		currency: 'gbp',
		automatic_payment_methods: {
			enabled: true,
		},
	});

	if (!paymentIntent) {
		return next(new ErrorHandler('', 400));
	}

	res.status(200).json({
		paymentIntent: paymentIntent.client_secret,
	});
});

// Checkout
exports.checkout = catchAsyncErrors(async (req, res, next) => {
	const { amount } = req.body;
	const userId = req.user;

	const user = await User.findOne({ _id: userId });

	if (!user.stripeCustomerId) {
		const stripeCustomer = await stripe.customers.create();
		user.stripeCustomerId = stripeCustomer.id;
		await user.save();
	}

	const ephemeralKey = await stripe.ephemeralKeys.create(
		{ customer: user.stripeCustomerId },
		{ apiVersion: '2022-11-15' }
	);

	const paymentIntent = await stripe.paymentIntents.create({
		amount,
		currency: 'gbp',
		customer: user.stripeCustomerId,
		automatic_payment_methods: {
			enabled: true,
		},
	});

	res.status(200).json({
		paymentIntent: paymentIntent.client_secret,
		ephemeralKey: ephemeralKey.secret,
		customer: user.stripeCustomerId,
		publishableKey: process.env.STRIPE_PUBLIC_KEY,
	});
});

// Payment Confirm
exports.paymentConfirm = catchAsyncErrors(async (req, res, next) => {
	const { bookingId } = req.params;
	const userId = req.user;

	const booking = await Booking.findOne({ _id: bookingId });

	if (!booking) {
		return next(new ErrorHandler('Booking not found', 404));
	}

	booking.status = 'Completed';
	await booking.save();

	res.status(200).json({
		message: 'Payment Successful.',
		booking,
	});
});
