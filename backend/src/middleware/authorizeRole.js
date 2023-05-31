const ErrorHandler = require('../utils/errorHandler');

const authorizeRole = (...roles) => {
	return (req, res, next) => {
		console.log('inside authorizeRole');
		console.log('user => ', req.user);
		if (!roles.includes.req.user.role) {
			return next(
				ErrorHandler(
					`Role: ${req.user.role} is not allowed to access the resource.`,
					403
				)
			);
		}
	};
};

module.exports = authorizeRole;
