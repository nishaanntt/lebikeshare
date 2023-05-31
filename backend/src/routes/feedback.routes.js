const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const {
	addFeedback,
	listFeedbacks,
} = require('../controllers/feedback.controller');

router.route('/new').post(authenticate, addFeedback);
router.route('/all').get(authenticate, listFeedbacks);

module.exports = router;
