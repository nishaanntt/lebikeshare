const express = require('express');
const router = express.Router();

const {
	changePassword,
	userProfile,
} = require('../controllers/user.controller');
const authenticate = require('../middleware/authenticate');

router.route('/changepassword').put(authenticate, changePassword);
router.route('/:id').get(authenticate, userProfile);

module.exports = router;
