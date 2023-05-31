require('dotenv');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Booking = require('../models/Booking.model');
const User = require('../models/User.model');
const Bike = require('../models/Bike.model');
const BikeStation = require('../models/BikeStation.model');
const ErrorHandler = require('../utils/errorHandler');
const moment = require('moment-timezone');

// *** CREATE BOOKING ***
exports.newBooking = catchAsyncErrors(async (req, res, next) => {
	const { bikeId, startTime, endTime, source } = req.body;
	const userId = req.user._id;

	if (startTime > endTime) {
		return next(new ErrorHandler('Start time cannot be after End time.', 400));
	}

	const sourceStation = await BikeStation.findById(source);

	if (!sourceStation) {
		return next(new ErrorHandler('Bike station not found.', 404));
	}

	const bikeIndex = sourceStation.bikes.indexOf(bikeId);

	if (bikeIndex === -1) {
		return next(new ErrorHandler('Bike not found in the source station.', 404));
	}

	const bike = await Bike.findById(bikeId);

	if (!bike) {
		return next(new ErrorHandler('Bike not found', 404));
	}

	if (
		bike.status == 'Booked' ||
		bike.status == 'In Use' ||
		bike.status == 'Under Maintenance'
	) {
		return next(new ErrorHandler('Bike not available.'));
	}

	bike.status = 'Booked';
	await bike.save();

	const bookingStart = Date.parse(startTime);
	const bookingEnd = Date.parse(endTime);
	const durationInMs = bookingEnd - bookingStart;
	const halfHourIntervals = Math.ceil(durationInMs / 1_800_000);
	const costPer30Min = 1.65;

	const totalCost = halfHourIntervals * costPer30Min;
	console.log('totalCost: ', totalCost);

	const newBooking = await Booking.create({
		userId,
		bikeId: bike._id,
		bikeStationId: source,
		startTime,
		endTime,
		totalCost,
	});

	const updatedUser = await User.findOneAndUpdate(
		{ _id: userId },
		{ $push: { bookings: newBooking._id } },
		{ new: true }
	);

	console.log('updatedUser: ', updatedUser);
	if (!updatedUser) {
		return next(new ErrorHandler());
	}

	res.status(201).json({
		message: 'Booking created successfully',
		newBooking,
	});
});

// *** DELETE BOOKING ***
exports.deleteBooking = catchAsyncErrors(async (req, res, next) => {
	const { bookingId } = req.params;
	const userId = req.user._id;

	const booking = await Booking.findOne({ bookingId });

	if (!booking) {
		return next(new ErrorHandler('Booking not found', 404));
	}

	const user = await User.findOne({ _id: userId });

	if (!user) {
		return next(new ErrorHandler('User not found', 404));
	}

	const bike = await Bike.findOne({ _id: booking.bikeId });

	if (!bike) {
		return next(new ErrorHandler('Bike for the booking not found', 404));
	}

	const bookingIndex = user.bookings.indexOf(id);

	if (bookingIndex == -1) {
		return next(new ErrorHandler('Booking not found for the user.', 404));
	}

	if (bookingIndex >= 0 && booking.status == 'pending') {
		user.bookings.splice(bookingIndex, 1);
		bike.status = 'available';
		await user.save();
		await bike.save();
	}

	await Booking.deleteOne({ _id: id });

	res.status(200).json({
		message: 'Booking deleted successfully',
		user,
	});
});

// *** BOOKING DETAILS ***
exports.bookingDetails = catchAsyncErrors(async (req, res, next) => {
	const { bookingId } = req.params;

	const booking = await Booking.findOne({ _id: bookingId }).populate(
		'bikeStationId destination',
		'name location'
	);

	if (!booking) {
		return next(new ErrorHandler('Booking not found', 404));
	}

	res.status(200).json({
		data: booking,
	});
});

// *** BOOKING LIST ***
exports.bookingList = catchAsyncErrors(async (req, res, next) => {
	const userId = req.user;
	const count = await Booking.countDocuments({ userId });
	const bookingList = await Booking.find(
		{ userId },
		'_id startTime endTime status'
	);

	res.status(200).json({
		count,
		data: bookingList,
	});
});

// *** EDIT BOOKING ***
exports.editBooking = catchAsyncErrors(async (req, res, next) => {
	const { bookingId } = req.params;
	const { bikeId, startTime, endTime, source } = req.body;

	const booking = await Booking.find({ bookingId });

	if (!booking) {
		return next(new ErrorHandler('Booking not found', 404));
	}

	const oldBikeId = booking.bikeId;

	if (startTime) booking.startTime = startTime;
	if (endTime) booking.endTime = endTime;
	if (source) booking.bikeStationId = source;

	if (bikeId) {
		const newBike = await Bike.findOne({ _id: bikeId });
		const oldBike = await Bike.findOne({ _id: oldBikeId });

		if (!newBike) {
			return next(new ErrorHandler('Bike not found', 404));
		}

		if (newBike.status != 'available') {
			return next(new ErrorHandler('The selected bike is not available', 400));
		}

		oldBike.status == 'available';
		newBike.status == 'booked';
		await oldBike.save();
		await newBike.save();
	}

	res.status(200).json({
		message: 'Booking details updated successfully',
		booking,
	});
});

// *** START BOOKING ***
exports.startBooking = catchAsyncErrors(async (req, res, next) => {
	const { bookingId } = req.params;
	const userId = req.user;
	const booking = await Booking.findOne({ _id: bookingId });
	console.log('Finding booking by id...');
	if (!booking) {
		return next(new ErrorHandler('Booking not found', 404));
	}
	if (booking.status == 'Cancelled') {
		return next(
			new ErrorHandler('Cannot start booking. Booking already cancelled.', 400)
		);
	}
	if (booking.status == 'Ongoing') {
		return next(new ErrorHandler('Booking already started', 401));
	}
	const user = await User.findOne({ _id: userId });
	if (!user) {
		return next(new ErrorHandler('User not found', 404));
	}
	const bike = await Bike.findOne({ _id: booking.bikeId });
	if (!bike) {
		return next(new ErrorHandler('Bike not found', 404));
	}
	const bikeStation = await BikeStation.findOne({ _id: booking.bikeStationId });
	if (!bikeStation) {
		return next(new ErrorHandler('Bike Station not found', 404));
	}
	const bikeIndex = bikeStation.bikes.indexOf(booking.bikeId);
	const serverTimeZone = moment.tz.guess();
	const bookingStartTime = moment.tz(booking.startTime, serverTimeZone);
	const currentTime = moment.tz(serverTimeZone);
	const bookingStartTimeUTC = moment.tz(bookingStartTime, serverTimeZone).utc();
	const currentTimeUTC = moment.tz(currentTime, serverTimeZone).utc();
	const timeDiff = currentTimeUTC.diff(bookingStartTimeUTC);
	const fiveMins = 5 * 60 * 1000;
	console.log('1st Condition: ', timeDiff >= -fiveMins && timeDiff <= fiveMins);
	if (timeDiff >= -fiveMins && timeDiff <= fiveMins) {
		console.log('Inside 1st if');
		if (bikeIndex == -1) {
			return next(new ErrorHandler('Bike not found in the station', 404));
		}
		if (bikeIndex >= 0) {
			console.log('Inside 2nd if');
			bikeStation.bikes.splice(bikeIndex, 1);
			bikeStation.availableSlots++;
			await bikeStation.save();
		}
		bike.status = 'In Use';
		booking.startedTime = currentTime;
		booking.status = 'Ongoing';
		await bike.save();
		await booking.save();
		res.status(200).json({
			message: 'BOOKING START',
			bike,
			bikeStation,
		});
	} else if (timeDiff > fiveMins) {
		booking.status = 'Cancelled';
		bike.status = 'Available';
		await bike.save();
		await booking.save();
		res.status(400).json({
			message: 'Sorry, your booking has been cancelled.',
			bike,
			booking,
			bikeIndex,
		});
	} else if (timeDiff < -fiveMins) {
		res.status(401).json({
			message: 'cannot start booking yet.',
		});
	}
});

// *** END BOOKING ***
exports.endBooking = catchAsyncErrors(async (req, res, next) => {
	const { bookingId } = req.params;
	const userId = req.user;
	const { destinationId } = req.body;
	const booking = await Booking.findOne({ _id: bookingId });
	if (!booking) {
		return next(new ErrorHandler('Booking not found', 404));
	}
	if (booking.status != 'Ongoing') {
		return next(new ErrorHandler('Cannot end booking.', 400));
	}
	const user = await User.findOne({ _id: userId });
	if (!user) {
		return next('User not found.', 404);
	}
	const bike = await Bike.findOne({ _id: booking.bikeId });
	if (!bike) {
		return next('Bike not found', 404);
	}
	const bikeStation = await BikeStation.findOne({ _id: destinationId });
	if (!bikeStation) {
		return next(new ErrorHandler('Bike Station not found', 404));
	}
	const serverTimeZone = moment.tz.guess();
	const currentTime = moment.tz(serverTimeZone).utc();
	const bookingStartTimeUTC = moment
		.tz(booking.startedTime, serverTimeZone)
		.utc();
	const timeElapsed = currentTime.diff(bookingStartTimeUTC);
	const thirtyMinutes = 30 * 60 * 1000;
	const numberOfIntervals = Math.ceil(timeElapsed / thirtyMinutes);
	const costPer30Min = 1.65;
	const totalCost = costPer30Min * numberOfIntervals;
	booking.totalCost = totalCost;
	booking.endedTime = currentTime;
	booking.status = 'Pending Payment';
	booking.destination = bikeStation._id;
	bike.status = 'Available';
	bikeStation.bikes.push(bike);
	bikeStation.availableSlots--;
	await booking.save();
	await bike.save();
	await bikeStation.save();
	res.status(200).json({
		message: 'Booking completed successfully. Pending payment.',
		booking,
		bike,
		bikeStation,
	});
});
