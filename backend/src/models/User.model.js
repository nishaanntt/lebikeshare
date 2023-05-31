const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const validators = require('../utils/validators');

const addressSchema = new Schema({
	line1: {
		type: String,
		required: [true, 'Address Line 1 is required'],
	},
	line2: {
		type: String,
	},
	town: {
		type: String,
		required: [true, 'Town is required'],
	},
	county: {
		type: String,
	},
	postcode: {
		type: String,
		required: [true, 'Postcode is required'],
	},
	country: {
		type: String,
		default: 'United Kingdom',
	},
});

const UserSchema = new Schema({
	firstName: {
		type: String,
		required: [true, 'First Name is required.'],
		validate: {
			validator: validators.validateName,
			message: 'Enter a valid First Name.',
		},
		trim: true,
	},
	lastName: {
		type: String,
		required: [true, 'Last Name is required.'],
		validate: {
			validator: validators.validateName,
			message: 'Enter a valid Last Name.',
		},
		trim: true,
	},
	email: {
		type: String,
		required: [true, 'Email is required.'],
		// lowercase: true,
		unique: true,
		trim: true,
		match: [
			/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
			'Enter a valid Email Address.',
		],
	},
	password: {
		type: String,
		// add validation
	},
	mobileNumber: {
		type: String,
		required: [true, 'Mobile number is required.'],
		unique: true,
		trim: true,
		validate: {
			validator: validators.validateUkMobileNumber,
			message: props => `${props.value} is not a valid UK mobile number.`,
		},
	},
	dateOfBirth: {
		type: Date,
		required: [true, 'Date of birth is required.'],
	},
	address: {
		type: [addressSchema, 'Enter a valid Address'],
		required: [true, 'Address is required.'],
	},
	verified: Boolean,
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user',
		trim: true,
	},
	profilePicture: {},
	paymentMethods: [],
	bookings: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Bookings',
		},
	],
	monthlyBilling: {},
	rideHistory: [],
	emergencyContact: {},
	feedback: [
		{
			type: String,
		},
	],
	paymentPreference: {
		type: String,
		// enum: ['Subscription', 'PerUse'],
		default: 'PerUse',
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	stripeCustomerId: {
		type: String,
	},
});

UserSchema.methods.getResetPasswordToken = async function () {
	const resetToken = Math.floor(1000 + Math.random() * 9000).toString();

	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');
	this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
