const express = require('express');
const router = express.Router();

const {
	checkout,
	paymentConfirm,
} = require('../controllers/payment.controller');

const authenticate = require('../middleware/authenticate');

router.route('/checkout').post(authenticate, checkout);
router.route('/confirm/:bookingId').post(authenticate, paymentConfirm);

module.exports = router;
