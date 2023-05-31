const nodemailer = require('nodemailer');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.AUTH_EMAIL,
		pass: process.env.AUTH_PASS,
	},
});

const sendEmail = catchAsyncErrors(async mailOptions => {
	const email = await transporter.sendMail(mailOptions);
	return email;
});

module.exports = sendEmail;
