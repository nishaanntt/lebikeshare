const moment = require('moment');

const calculateCost = () => {
	const first30Rate = 1.65;
	const additional30Rate = 1.25;

	const startTime = moment('10 April 2023', [DDMMYYYY]).format();
	console.log('startTime: ', startTime);
};

module.exports = calculateCost;
