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
import { axiosInstance, endpoints } from '../../api';

// *** LIST BIKES ***
const bikeListRequest = () => {
	return {
		type: LIST_BIKE_REQUEST,
	};
};

const bikeListSuccess = data => {
	return {
		type: LIST_BIKE_SUCCESS,
		payload: data,
	};
};

const bikeListFail = error => {
	return {
		type: LIST_BIKE_FAIL,
		payload: error,
	};
};

export const getBikeList = token => {
	return dispatch => {
		dispatch(bikeListRequest());
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axiosInstance
			.get(endpoints.admin.bike.listBikes, config)
			.then(res => {
				const data = res.data;
				dispatch(bikeListSuccess(data));
			})
			.catch(err => {
				dispatch(bikeListFail(err));
			});
	};
};

// *** ADD BIKE ***
const addBikeRequest = () => {
	return {
		type: ADD_BIKE_REQUEST,
	};
};

const addBikeSuccess = data => {
	return {
		type: ADD_BIKE_SUCCESS,
		payload: data,
	};
};

const addBikeFail = err => {
	return {
		type: ADD_BIKE_FAIL,
		payload: err,
	};
};

export const addBike = (
	data,
	token,
	successCallback = () => {},
	errorCallback = () => {}
) => {
	return dispatch => {
		dispatch(addBikeRequest());
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axiosInstance
			.post(endpoints.admin.bike.addBike, data, config)
			.then(res => {
				const data = res.data;
				dispatch(addBikeSuccess(data));
				successCallback();
			})
			.catch(err => {
				const error = err;
				dispatch(addBikeFail(error));
				errorCallback();
			});
	};
};

// *** BIKE DETAILS ***
const bikeDetailsRequest = () => {
	return {
		type: GET_BIKE_DETAILS_REQUEST,
	};
};

const bikeDetailsSuccess = data => {
	return {
		type: GET_BIKE_DETAILS_SUCCESS,
		payload: data,
	};
};

const bikeDetailsFail = error => {
	return {
		type: GET_BIKE_DETAILS_FAIL,
		payload: error,
	};
};

export const getBikeDetails = (bikeId, token, successCallback) => {
	return dispatch => {
		dispatch(bikeDetailsRequest());
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axiosInstance
			.get(`${endpoints.admin.bike.bikeDetails}${bikeId}`, config)
			.then(res => {
				const data = res.data;
				dispatch(bikeDetailsSuccess(data));
				successCallback();
			})
			.catch(err => {
				const error = err;
				dispatch(bikeDetailsFail(error));
			});
	};
};

// *** DELETE BIKE ***
const deleteBikeRequest = () => {
	return { type: DELETE_BIKE_REQUEST };
};
const deleteBikeSuccess = data => {
	return { type: DELETE_BIKE_SUCCESS, payload: data };
};
const deleteBikeFail = err => {
	return { type: DELETE_BIKE_FAIL, payload: err };
};

export const deleteBike = (
	token,
	bikeId,
	successCallback = () => {},
	errorCallback = () => {}
) => {
	return dispatch => {
		dispatch(deleteBikeRequest());
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axiosInstance
			.delete(`${endpoints.admin.bike.deleteBike}${bikeId}`, config)
			.then(res => {
				const data = res.data;
				deleteBikeSuccess(data);
				successCallback();
			})
			.catch(err => {
				const error = err.response.data.error;
				dispatch(deleteBikeFail(error));
				errorCallback();
			});
	};
};

// *** EDIT BIKE ***
