import {
	END_BOOKING_FAIL,
	END_BOOKING_REQUEST,
	END_BOOKING_SUCCESS,
	GET_BOOKING_DETAILS_FAIL,
	GET_BOOKING_DETAILS_REQUEST,
	GET_BOOKING_DETAILS_SUCCESS,
	LIST_BOOKING_FAIL,
	LIST_BOOKING_REQUEST,
	LIST_BOOKING_SUCCESS,
	NEW_BOOKING_FAIL,
	NEW_BOOKING_REQUEST,
	NEW_BOOKING_SUCCESS,
	START_BOOKING_FAIL,
	START_BOOKING_REQUEST,
	START_BOOKING_SUCCESS,
} from '../type/booking.type';
import { axiosInstance, endpoints } from '../../api';

// New Booking
const newBookingRequest = () => {
	return {
		type: NEW_BOOKING_REQUEST,
	};
};

const newBookingSuccess = data => {
	return {
		type: NEW_BOOKING_SUCCESS,
		payload: data,
	};
};

const newBookingFail = err => {
	return {
		type: NEW_BOOKING_FAIL,
		payload: err,
	};
};

export const createNewBooking = (
	data,
	token,
	successCallback = () => {},
	errorCallback = () => {}
) => {
	return dispatch => {
		dispatch(newBookingRequest());
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axiosInstance
			.post(endpoints.booking.newBooking, data, config)
			.then(res => {
				const data = res.data;
				dispatch(newBookingSuccess(data));
				successCallback();
			})
			.catch(err => {
				const error = err;
				dispatch(newBookingFail(error));
				errorCallback();
			});
	};
};

// List Bookings
const getBookingListRequest = () => {
	return {
		type: LIST_BOOKING_REQUEST,
	};
};

const getBookingListSuccess = data => {
	return {
		type: LIST_BOOKING_SUCCESS,
		payload: data,
	};
};

const getBookingListFail = err => {
	return {
		type: LIST_BOOKING_FAIL,
		payload: err,
	};
};

export const getBookingList = token => {
	return dispatch => {
		dispatch(getBookingListRequest());
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axiosInstance
			.get(endpoints.booking.listBookings, config)
			.then(res => {
				const data = res.data;
				console.log('data: ', data);
				dispatch(getBookingListSuccess(data));
			})
			.catch(err => {
				const error = err;
				dispatch(getBookingListFail(error));
			});
	};
};

// Booking Details
const getBookingDetailsRequest = () => {
	return {
		type: GET_BOOKING_DETAILS_REQUEST,
	};
};

const getBookingDetailsSuccess = data => {
	return {
		type: GET_BOOKING_DETAILS_SUCCESS,
		payload: data,
	};
};

const getBookingDetailsFail = err => {
	return {
		type: GET_BOOKING_DETAILS_FAIL,
		payload: err,
	};
};

export const getBookingDetails = (
	bookingId,
	token,
	successCallback = () => {},
	failCallback = () => {}
) => {
	return dispatch => {
		dispatch(getBookingDetailsRequest());
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axiosInstance
			.get(`${endpoints.booking.bookingDetails}${bookingId}`, config)
			.then(res => {
				const bookingData = res.data;
				console.log('booking data: ', bookingData.data);
				dispatch(getBookingDetailsSuccess(bookingData.data));
				successCallback();
			})
			.catch(err => {
				const error = err;
				dispatch(getBookingDetailsFail(error));
				failCallback();
			});
	};
};

// Start Booking
const startBookingRequest = () => {
	return {
		type: START_BOOKING_REQUEST,
	};
};

const startBookingSuccess = data => {
	return {
		type: START_BOOKING_SUCCESS,
		payload: data,
	};
};

const startBookingFail = err => {
	return {
		type: START_BOOKING_FAIL,
		payload: err,
	};
};

export const startBooking = (
	bookingId,
	token,
	successCallback = () => {},
	errorCallback = () => {}
) => {
	return dispatch => {
		dispatch(startBookingRequest());
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		console.log('config: ', config);
		axiosInstance
			.put(`${endpoints.booking.startBooking}${bookingId}/start`, {}, config)
			.then(res => {
				const data = res.data;
				dispatch(startBookingSuccess(data));
				successCallback();
			})
			.catch(err => {
				const error = err.response.data.error;
				dispatch(startBookingFail(error));
				errorCallback();
			});
	};
};

// End Booking
const endBookingRequest = () => {
	return {
		type: END_BOOKING_REQUEST,
	};
};

const endBookingSuccess = data => {
	return {
		type: END_BOOKING_SUCCESS,
		payload: data,
	};
};

const endBookingFail = error => {
	return {
		type: END_BOOKING_FAIL,
		payload: error,
	};
};

export const endBooking = (
	bookingId,
	destinationId,
	token,
	successCallback = () => {},
	errorCallback = () => {}
) => {
	return dispatch => {
		dispatch(endBookingRequest());
		config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axiosInstance
			.put(
				`${endpoints.booking.endBooking}${bookingId}/end`,
				{
					destinationId,
				},
				config
			)
			.then(res => {
				const data = res.data;
				dispatch(endBookingSuccess(data));
				successCallback();
			})
			.catch(err => {
				const error = err.response.data.error;
				dispatch(endBookingFail(error));
				errorCallback();
			});
	};
};
