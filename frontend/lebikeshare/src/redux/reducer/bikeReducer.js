import {
	ADD_BIKE_FAIL,
	ADD_BIKE_REQUEST,
	ADD_BIKE_SUCCESS,
	DELETE_BIKE_FAIL,
	DELETE_BIKE_REQUEST,
	DELETE_BIKE_SUCCESS,
	GET_BIKE_DETAILS_FAIL,
	GET_BIKE_DETAILS_REQUEST,
	GET_BIKE_DETAILS_SUCCESS,
	LIST_BIKE_FAIL,
	LIST_BIKE_REQUEST,
	LIST_BIKE_SUCCESS,
} from '../type/bike.types';

import { LOGOUT } from '../type/auth.type';

const initialState = {
	isLoading: false,
	bikes: [],
	error: '',
	bike: {},
	data: {},
};

const BikeReducer = (state = initialState, action) => {
	switch (action.type) {
		case LIST_BIKE_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case LIST_BIKE_SUCCESS:
			return {
				...state,
				isLoading: false,
				bikes: action.payload,
				error: null,
			};
		case LIST_BIKE_FAIL:
			return {
				...state,
				isLoading: false,
				bikes: null,
				error: action.payload,
			};
		case GET_BIKE_DETAILS_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case GET_BIKE_DETAILS_SUCCESS:
			return {
				...state,
				isLoading: false,
				bike: action.payload,
				error: null,
			};
		case GET_BIKE_DETAILS_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.payload,
				bike: {},
			};
		case ADD_BIKE_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case ADD_BIKE_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload,
			};
		case ADD_BIKE_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		case DELETE_BIKE_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case DELETE_BIKE_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case DELETE_BIKE_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default BikeReducer;
