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
import { axiosInstance, endpoints } from '../../api';

// *** LIST BIKE STATIONS ***
const listBikeStationRequest = () => {
	return {
		type: LIST_BIKE_STATION_REQUEST,
	};
};

const listBikeStationSuccess = data => {
	return {
		type: LIST_BIKE_STATION_SUCCESS,
		payload: data,
	};
};

const listBikeStationFail = err => {
	return {
		type: LIST_BIKE_STATION_FAIL,
		payload: err,
	};
};

export const getBikeStationList = token => {
	return dispatch => {
		dispatch(listBikeStationRequest());
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axiosInstance
			.get(endpoints.admin.bikeStation.listBikeStation, config)
			.then(res => {
				const data = res.data;
				dispatch(listBikeStationSuccess(data));
			})
			.catch(err => {
				dispatch(listBikeStationFail(err));
			});
	};
};

// *** ADD BIKE STATION ***
const addBikeStationRequest = () => {
	return {
		type: ADD_BIKE_STATION_REQUEST,
	};
};

const addBikeStationSuccess = data => {
	return {
		type: ADD_BIKE_STATION_SUCCESS,
		payload: data,
	};
};

const addBikeStationFail = err => {
	return {
		type: ADD_BIKE_STATION_FAIL,
		payload: err,
	};
};

export const addBikeStation = (data, token, successCallback) => {
	return dispatch => {
		dispatch(addBikeStationRequest());
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axiosInstance
			.post(endpoints.admin.bikeStation.addBikeStation, data, config)
			.then(res => {
				const data = res.data;
				dispatch(addBikeStationSuccess(data));
				successCallback();
			})
			.catch(err => {
				const error = err;
				dispatch(addBikeStationFail(error));
			});
	};
};

// *** BIKE STATION DETAILS ***
const bikeStationDetailsRequest = () => {
	return {
		type: BIKE_STATION_DETAILS_REQUEST,
	};
};

const bikeStationDetailsSuccess = data => {
	return {
		type: BIKE_STATION_DETAILS_SUCCESS,
		payload: data,
	};
};

const bikeStationDetailsFail = err => {
	return {
		type: BIKE_STATION_DETAILS_FAIL,
		payload: err,
	};
};

export const getBikeStationDetails = (
	bikeStationId,
	token,
	successCallback
) => {
	return dispatch => {
		dispatch(bikeStationDetailsRequest());
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axiosInstance
			.get(
				`${endpoints.admin.bikeStation.bikeStationDetails}${bikeStationId}`,
				config
			)
			.then(res => {
				const data = res.data;
				dispatch(bikeStationDetailsSuccess(data));
				successCallback();
			})
			.catch(err => {
				const error = err;
				dispatch(bikeStationDetailsFail(error));
			});
	};
};
