const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const BookingSchema = new Schema({
	bookingId: {
		type: String,
		default: uuidv4(),
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	bikeId: {
		type: Schema.Types.ObjectId,
		ref: 'Bike',
		required: true,
	},
	bikeStationId: {
		type: Schema.Types.ObjectId,
		ref: 'BikeStation',
		required: true,
	},
	destination: {
		type: Schema.Types.ObjectId,
		ref: 'BikeStation',
	},
	startTime: {
		type: Date,
		required: true,
	},
	endTime: {
		type: Date,
		required: true,
	},
	startedTime: {
		type: Date,
	},
	endedTime: {
		type: Date,
	},
	totalCost: {
		type: Number,
	},
	status: {
		type: String,
		enum: ['Confirmed', 'Cancelled', 'Ongoing', 'Pending Payment', 'Completed'],
		default: 'Confirmed',
	},
	feedback: {
		type: Schema.Types.ObjectId,
		ref: 'Feedback',
	},
});

const Booking = mongoose.model('Bookings', BookingSchema);
module.exports = Booking;
