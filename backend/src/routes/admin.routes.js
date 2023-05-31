const express = require('express');
const router = express.Router();
const authenticated = require('../middleware/authenticate');
const authorizeRole = require('../middleware/authorizeRole');

const {
	addBikeStation,
	listBikeStation,
	bikeStationDetails,
	deleteBikeStation,
	editBikeStation,
} = require('../controllers/bikeStation.controller');
const {
	addBike,
	listAllBikes,
	bikeDetails,
	deleteBike,
	editBikeDetails,
} = require('../controllers/bike.controller');

router.route('/station/new').post(authenticated, addBikeStation);
router.route('/station/all').get(authenticated, listBikeStation);
router
	.route('/station/:id')
	.get(authenticated, bikeStationDetails)
	.delete(authenticated, deleteBikeStation)
	.put(authenticated, editBikeStation);

router.route('/bike/new').post(authenticated, addBike);
router.route('/bike/all').get(authenticated, listAllBikes);
router
	.route('/bike/:id')
	.get(authenticated, bikeDetails)
	.delete(authenticated, deleteBike)
	.put(authenticated, editBikeDetails);

module.exports = router;
