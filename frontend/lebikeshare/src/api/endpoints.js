const auth = {
	register: '/auth/register',
	login: '/auth/login',
	resendVerificationEmail: '/auth/resendVerification',
	forgotPassword: '/auth/forgotPassword',
	resetPassword: '/auth/resetPassword',
};

const booking = {
	newBooking: '/booking/new',
	bookingDetails: '/booking/',
	listBookings: '/booking/all',
	deleteBooking: '/booking/',
	startBooking: '/booking/',
	endBooking: '/booking/',
};

const payment = {
	checkout: '/payments/checkout',
	confirm: '/payments/confirm/',
};

const user = {
	changePassword: '/user/changePassword',
	profile: '/user/',
};

const admin = {
	bike: {
		addBike: '/admin/bike/new',
		listBikes: '/admin/bike/all',
		bikeDetails: '/admin/bike/',
		deleteBike: '/admin/bike/',
		editBike: '/admin/bike/',
	},
	bikeStation: {
		addBikeStation: '/admin/station/new',
		listBikeStation: '/admin/station/all',
		bikeStationDetails: '/admin/station/',
		deleteBikeStation: '/admin/station/',
		editBikeStation: '/admin/station/',
	},
};

const feedback = {
	addFeedback: '/feedback/new',
};

export default { auth, booking, payment, user, admin, feedback };
