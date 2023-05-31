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

import { LOGOUT } from '../type/auth.type';

const initialState = {
	isLoading: false,
	bookings: [],
	booking: {},
	error: '',
	count: 0,
	message: '',
	data: {},
	bookingStarted: false,
};

const BookingReducer = (state = initialState, action) => {
	switch (action.type) {
		case NEW_BOOKING_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case NEW_BOOKING_SUCCESS:
			return {
				...state,
				isLoading: false,
				booking: action.payload.newBooking,
				message: action.payload.message,
			};
		case NEW_BOOKING_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		case LIST_BOOKING_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case LIST_BOOKING_SUCCESS:
			return {
				...state,
				isLoading: false,
				bookings: action.payload.data,
				count: action.payload.count,
			};
		case LIST_BOOKING_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		case GET_BOOKING_DETAILS_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case GET_BOOKING_DETAILS_SUCCESS:
			return {
				...state,
				isLoading: false,
				booking: action.payload,
			};
		case GET_BOOKING_DETAILS_FAIL:
			return {
				...state,
				isLoading: false,
				booking: {},
				error: action.payload,
			};
		case START_BOOKING_REQUEST:
			return {
				...state,
				isLoading: true,
				bookingStarted: false,
			};
		case START_BOOKING_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload,
				bookingStarted: true,
			};
		case START_BOOKING_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.payload,
				bookingStarted: false,
			};
		case END_BOOKING_REQUEST:
			return {
				...state,
				isLoading: true,
				bookingEnded: false,
			};
		case END_BOOKING_SUCCESS:
			return {
				...state,
				isLoading: false,
				booking: action.payload.booking,
				data: action.payload,
				message: action.payload.message,
				bookingEnded: true,
			};
		case END_BOOKING_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.payload,
				bookingEnded: false,
			};
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default BookingReducer;
