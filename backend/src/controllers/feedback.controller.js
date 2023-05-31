const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const BikeStation = require('../models/BikeStation.model');
const Booking = require('../models/Booking.model');
const Feedback = require('../models/Feedback.model');
const User = require('../models/User.model');
const ErrorHandler = require('../utils/errorHandler');

exports.addFeedback = catchAsyncErrors(async (req, res, next) => {
	const { bookingId, feedback } = req.body;
	const userId = req.user;

	const booking = await Booking.findOne({ _id: bookingId });

	if (!booking) {
		return next(new ErrorHandler('Booking not found', 404));
	}

	const user = await User.findOne({ _id: userId });

	if (!user) {
		return next(new ErrorHandler('User not found', 404));
	}

	const newFeedback = await Feedback.create({
		user: user._id,
		feedback,
		bookingId,
	});

	booking.feedback = newFeedback._id;
	await booking.save();

	res.status(200).json({
		message: 'Feedback successfully added.',
		feedback: newFeedback,
	});
});

exports.listFeedbacks = catchAsyncErrors(async (req, res, next) => {
	const feedbacks = await Feedback.find();

	const data = await Promise.all(
		feedbacks.map(async feedback => {
			const feedbackData = await Feedback.findOne({ _id: feedback._id });

			const booking = await Booking.findOne({ _id: feedbackData.bookingId });

			const source = await BikeStation.findOne({
				_id: booking.bikeStationId,
			}).select('name');

			const destination = await BikeStation.findOne({
				_id: booking.destination,
			}).select('name');

			const user = await User.findOne({ _id: booking.userId }).select(
				'firstName lastName email'
			);

			const data = {
				_id: feedback._id,
				feedback: feedback.feedback,
				user,
				source,
				destination,
			};

			return data;
		})
	);

	const feedbackList = data.reverse();

	res.status(200).json({
		data: feedbackList,
	});
});
