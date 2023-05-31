const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BikeSchema = new Schema({
	bikeNumber: {
		type: String,
		required: true,
		unique: true,
	},
	status: {
		type: String,
		enum: ['Available', 'Booked', 'In Use', 'Under Maintenance'],
		default: 'Available',
	},
	station: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'BikeStation',
		required: true,
	},
	lastService: {
		type: Date,
	},
});

const Bike = mongoose.model('Bike', BikeSchema);
module.exports = Bike;
