const express = require('express');
const router = express.Router();

const {
	register,
	registerAdmin,
	login,
	verifyEmail,
	resendVerificationEmail,
	forgotPassword,
	resetPassword,
} = require('../controllers/auth.controller');

router.route('/register').post(register);
router.route('/register/admin').post(registerAdmin);
router.route('/login').post(login);
router.route('/verify/:userId/:uniqueString').get(verifyEmail);
router.route('/resendVerification').post(resendVerificationEmail);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/').put(resetPassword);

module.exports = router;
