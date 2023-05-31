const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BikeStationSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	location: {
		latitude: {
			type: String,
			required: true,
		},
		longitude: {
			type: String,
			required: true,
		},
	},
	bikes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Bike',
		},
	],
	totalSlots: {
		type: Number,
		required: true,
	},
	availableSlots: {
		type: Number,
	},
	status: {
		type: String,
		enum: ['Inactive', 'Active'],
		default: 'Active',
	},
});

const BikeStation = mongoose.model('BikeStation', BikeStationSchema);

module.exports = BikeStation;
