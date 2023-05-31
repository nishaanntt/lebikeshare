import catchAsyncErrors from './catchAsyncErrors';

const validate = schema =>
	catchAsyncErrors(async (req, res, next) => {
		await schema.validate({
			body: req.body,
			query: req.query,
			params: req.params,
		});

		next();
	});

module.exports = validate;
