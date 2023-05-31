const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Bike = require('../models/Bike.model');
const BikeStation = require('../models/BikeStation.model');
const ErrorHandler = require('../utils/errorHandler');

// *** ADD BIKE ***
exports.addBike = catchAsyncErrors(async (req, res, next) => {
	const { bikeNumber, status, station, lastService } = req.body;

	const bikeStation = await BikeStation.findOne({ _id: station });

	if (!bikeStation) {
		return next(new ErrorHandler('Bike station not found', 404));
	}
	if (bikeStation.availableSlots == 0) {
		return next(
			new ErrorHandler('No available slots in the bike station', 401)
		);
	}

	const newBike = await Bike.create({
		bikeNumber,
		status,
		station: bikeStation,
		lastService,
	});

	if (!newBike) {
		return next(new ErrorHandler());
	}

	bikeStation.bikes.push(newBike);
	bikeStation.save();

	await BikeStation.updateOne(
		{ _id: bikeStation._id },
		{ $inc: { availableSlots: -1 } }
	);

	console.log(bikeStation);

	const data = {
		id: newBike._id,
		bikeNumber: newBike.bikeNumber,
		status: newBike.status,
		lastService: newBike.lastService,
		station: {
			id: bikeStation._id,
			name: bikeStation.name,
		},
	};

	res.status(201).json({
		message: 'New bike added successfully.',
		data,
	});
});

// *** List All Bikes ***
exports.listAllBikes = catchAsyncErrors(async (req, res, next) => {
	const bikeList = await Bike.find();
	console.log('bikeList: ', bikeList);
	const count = await Bike.countDocuments();

	res.status(200).json({
		count,
		data: bikeList,
	});
});

// *** BIKE DETAILS ***
exports.bikeDetails = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.params;

	const bike = await Bike.findOne({ _id: id });
	console.log('bike: ', bike);

	if (!bike) {
		return next(new ErrorHandler('Bike not found.', 404));
	}

	const station = await BikeStation.findOne({ _id: bike.station });
	console.log('station: ', station);
	const stationName = station.name;
	console.log('stationName: ', stationName);

	const data = {
		_id: bike._id,
		bikeNumber: bike.bikeNumber,
		status: bike.status,
		lastService: bike.lastService,
		station: {
			id: station._id,
			name: station.name,
		},
	};

	res.status(200).json({
		data,
	});
});

// *** DELETE BIKE ***
exports.deleteBike = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.params;
	const bike = await Bike.findOne({ _id: id });

	if (!bike) {
		return next(new ErrorHandler('Bike not found', 404));
	}

	const bikeStation = await BikeStation.findOne({
		_id: bike.station,
	});
	console.log('bikeStation: ', bikeStation);

	if (!bikeStation) {
		return next(
			new ErrorHandler('Bike Station associated with the bike not found', 404)
		);
	}

	const bikeIndex = bikeStation.bikes.indexOf(id);

	if (bikeIndex == -1) {
		return next(new ErrorHandler('Bike not found in the station', 404));
	}

	if (bikeIndex >= 0) {
		bikeStation.bikes.splice(bikeIndex, 1);
		bikeStation.availableSlots++;
		await bikeStation.save();
	}

	const deleteBike = await Bike.deleteOne({ _id: id });

	if (!deleteBike) {
		return next(new ErrorHandler());
	}

	res.status(200).json({
		message: 'Bike Details deleted successfully.',
	});
});

// *** EDIT BIKE DETAILS ***
exports.editBikeDetails = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.params;
	const { status, station: newStationId, lastService } = req.body;

	const bike = await Bike.findOne({ _id: id });

	if (!bike) {
		return next(new ErrorHandler('Bike not found', 404));
	}

	if (status) bike.status = status;
	if (lastService) bike.lastService = lastService;

	if (
		bike.station &&
		newStationId &&
		newStationId !== bike.station._id.toString()
	) {
		const oldStation = await BikeStation.findOne({ _id: bike.station._id });

		const newStation = await BikeStation.findById(newStationId);

		if (!oldStation || !newStation) {
			return next(new ErrorHandler('Bike station not found', 404));
		}

		console.log('bikes in old station: ', oldStation.bikes);

		const bikeIndex = oldStation.bikes.indexOf(id);

		if (bikeIndex == -1) {
			return next(new ErrorHandler('Bike not found in the old station', 404));
		}

		if (bikeIndex >= 0) {
			oldStation.bikes.splice(bikeIndex, 1);
			oldStation.availableSlots++;
			newStation.bikes.push(bike._id);
			newStation.availableSlots--;
			bike.station = newStationId;
			await oldStation.save();
			await newStation.save();
		}
	}

	await bike.save();

	return res.status(200).json({
		message: 'Bike details updated successfully.',
		data: bike,
	});
});
