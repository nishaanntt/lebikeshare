require('dotenv').config();
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const BikeStation = require('../models/BikeStation.model');
const ErrorHandler = require('../utils/errorHandler');
const Bike = require('../models/Bike.model');

// *** Add Bike Station ***
exports.addBikeStation = catchAsyncErrors(async (req, res, next) => {
	const { name, location, totalSlots } = req.body;

	const newStation = await BikeStation.create({
		name,
		location,
		totalSlots,
		availableSlots: totalSlots,
	});

	if (!newStation) {
		return next(new ErrorHandler());
	}

	res.status(201).json({
		message: 'New bike station successfully created.',
		data: newStation,
	});
});

// *** List Bike Stations ***
exports.listBikeStation = catchAsyncErrors(async (req, res, next) => {
	const stationList = await BikeStation.find()
		.select('_id name location totalSlots availableSlots bikes')
		.populate('bikes');

	const count = await BikeStation.countDocuments();

	const data = stationList.map(station => {
		const bikesAvailable = station.bikes.filter(
			bike => bike.status === 'Available'
		);
		return {
			_id: station._id,
			name: station.name,
			location: station.location,
			totalSlots: station.totalSlots,
			availableSlots: station.availableSlots,
			bikes: bikesAvailable,
		};
	});
	console.log('data: ', data);
	res.status(200).json({
		count,
		data,
	});
});

// *** Bike Station Details ***
exports.bikeStationDetails = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.params;

	const bikeStation = await BikeStation.findOne({ _id: id });

	if (!bikeStation) {
		return next(new ErrorHandler('Bike station not found', 404));
	}

	const bikeDetails = await Promise.all(
		bikeStation.bikes.map(async bikeId => {
			const bike = await Bike.findById(bikeId);

			if (!bike) {
				return next(new ErrorHandler('Bike not found', 404));
			}
			return bike;
		})
	);

	res.status(200).json({
		data: bikeStation,
		bikes: bikeDetails,
	});
});

// *** DELETE BIKE STATION ***
exports.deleteBikeStation = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.params;

	const bikeStation = await BikeStation.findOne({ _id: id });
	console.log('bikeStation: ', bikeStation);

	if (!bikeStation) {
		return next(new ErrorHandler('Bike station not found.', 404));
	}

	console.log('bikes: ', bikeStation.bikes.length);

	if (bikeStation.bikes.length > 0) {
		return next(
			new ErrorHandler(
				'Bike station not empty. Remove bikes from the bike station.'
			)
		);
	}

	const deleteBikeStation = await BikeStation.deleteOne({ _id: id });

	if (!deleteBikeStation) {
		return next(new ErrorHandler());
	}

	res.status(200).json({
		message: 'Bike Station deleted successfully.',
	});
});

// *** EDIT BIKE STATION ***
exports.editBikeStation = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.params;
	const { name, location, totalSlots, status } = req.body;

	const bikeStation = await BikeStation.findOne({ _id: id });
	console.log('bikeStation: ', bikeStation);

	if (!bikeStation) {
		return next(new ErrorHandler('Bike station not found.', 404));
	}

	if (name) bikeStation.name = name;
	if (location) bikeStation.location = location;
	if (status) bikeStation.status = status;

	if (totalSlots) {
		if (totalSlots === 0) {
			return next(
				new ErrorHandler('Total slots cannot be 0. Delete the bike station.')
			);
		}
		if (totalSlots < bikeStation.bikes.length) {
			return next(
				new ErrorHandler(
					'Total slots cannot be less than the number of bikes already in the station. Please move bikes.'
				)
			);
		}
		bikeStation.totalSlots = totalSlots;
		const newAvailable = bikeStation.totalSlots - bikeStation.bikes.length;
		bikeStation.availableSlots = newAvailable;
	}

	await bikeStation.save();

	res.status(200).json({
		message: 'Bike Station updated successfully.',
		data: bikeStation,
	});
});
