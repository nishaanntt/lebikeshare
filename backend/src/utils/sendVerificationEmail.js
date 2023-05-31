require('dotenv').config();

const { v4: uuidv4 } = require('uuid');
const UserVerification = require('../models/UserVerification.model');

const hashData = require('./hashData');

const sendEmail = require('./sendEmail');

const development = 'http://localhost:3000/';
const production = 'https://lit-eyrie-56544.herokuapp.com/';
// const currentUrl = process.env.NODE_ENV ? production : development;
const currentUrl = development;
console.log('currentUrl: ', currentUrl);

const sendVerificationEmail = async ({ _id, email }, res) => {
	try {
		const uniqueString = uuidv4() + _id;

		const mailOptions = {
			form: process.env.AUTH_EMAIL,
			to: email,
			subject: 'Account Verification Required',
			html: `<p>Verify your email address to complete the registration and log into your account.</p><p>This link <b>expires in 6 hours</b>.</p><p>Click <a href=${
				currentUrl + 'api/v1/auth/verify/' + _id + '/' + uniqueString
			}>here</a> to proceed.</p>`,
		};

		const hashedUniqueString = await hashData(uniqueString);

		const newVerification = await new UserVerification({
			userId: _id,
			uniqueString: hashedUniqueString,
			createdAt: Date.now(),
			expiresAt: Date.now() + 21600000,
		});

		await newVerification.save();
		await sendEmail(mailOptions);

		return {
			userId: _id,
			email,
		};
	} catch (error) {
		throw error;
	}
};

module.exports = sendVerificationEmail;
