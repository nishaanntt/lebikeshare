const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const FeedbackSchema = new Schema({
	feedbackId: {
		type: String,
		default: uuidv4(),
	},
	bookingId: {
		type: Schema.Types.ObjectId,
		ref: 'Bookings',
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	feedback: {
		type: String,
		required: true,
	},
	sharedAt: {
		type: String,
		enum: ['Twitter', 'Instagram', 'Facebook'],
	},
	mediaLink: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback;
