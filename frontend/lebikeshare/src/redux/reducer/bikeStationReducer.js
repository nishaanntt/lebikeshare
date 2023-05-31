import {
	ADD_BIKE_STATION_FAIL,
	ADD_BIKE_STATION_REQUEST,
	ADD_BIKE_STATION_SUCCESS,
	BIKE_STATION_DETAILS_FAIL,
	BIKE_STATION_DETAILS_REQUEST,
	BIKE_STATION_DETAILS_SUCCESS,
	LIST_BIKE_STATION_FAIL,
	LIST_BIKE_STATION_REQUEST,
	LIST_BIKE_STATION_SUCCESS,
} from '../type/bikeStation.type';

import { LOGOUT } from '../type/auth.type';

const initialState = {
	isLoading: false,
	bikeStations: null,
	error: '',
	data: null,
	message: '',
	bikeStation: {},
	availableBikes: [],
};

const BikeStationReducer = (state = initialState, action) => {
	switch (action.type) {
		case LIST_BIKE_STATION_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case LIST_BIKE_STATION_SUCCESS:
			return {
				...state,
				isLoading: false,
				bikeStations: action.payload,
				error: null,
			};
		case LIST_BIKE_STATION_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		case ADD_BIKE_STATION_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case ADD_BIKE_STATION_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload.data,
				message: action.payload.message,
			};
		case ADD_BIKE_STATION_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		case BIKE_STATION_DETAILS_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case BIKE_STATION_DETAILS_SUCCESS:
			return {
				...state,
				isLoading: false,
				bikeStation: action.payload,
				availableBikes:
					action.payload.bikes.length != 0
						? action.payload.bikes.filter(bike => bike.status == 'Available')
						: [],
			};
		case BIKE_STATION_DETAILS_FAIL:
			return {
				...state,
				isLoading: false,
				bikeStation: null,
				availableBikes: null,
				error: action.payload,
			};
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default BikeStationReducer;
