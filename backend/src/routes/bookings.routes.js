const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authenticate');

const {
	newBooking,
	bookingList,
	bookingDetails,
	deleteBooking,
	editBooking,
	startBooking,
	endBooking,
} = require('../controllers/booking.controller');

router.route('/new').post(authenticate, newBooking);
router.route('/all').get(authenticate, bookingList);
router
	.route('/:bookingId')
	.get(authenticate, bookingDetails)
	.put(editBooking)
	.delete(deleteBooking);
router.route('/:bookingId/start').put(authenticate, startBooking);
router.route('/:bookingId/end').put(authenticate, endBooking);
module.exports = router;
