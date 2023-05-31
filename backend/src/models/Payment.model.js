const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
	bookingId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Bookings',
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	paymentMethod: {
		type: String,
		required: true,
	},
	paymentStatus: {
		type: String,
		required: true,
		default: 'Pending',
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	updatedAt: {
		type: Date,
		default: Date.now(),
	},
});

const Payment = mongoose.model('Payments', PaymentSchema);
module.exports = Payment;
