const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	booking: {
		type: Schema.Types.ObjectId,
		ref: 'Booking',
		required: true,
	},
	transactionDate: {
		type: Date,
		default: Date.now(),
	},
	transactionId: {
		type: String,
		required: true,
	},
	amount: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: ['Pending', 'Completed', 'Refunded', 'Cancelled'],
		default: 'pending',
		required: true,
	},
	paymentMethod: {
		type: String,
		enum: ['Debit Card', 'Credit Card', 'PayPal', 'Apple Pay', 'Google Pay'],
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		required: true,
	},
	updatedAt: {
		type: Date,
		default: Date.now(),
		required: true,
	},
});

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;
