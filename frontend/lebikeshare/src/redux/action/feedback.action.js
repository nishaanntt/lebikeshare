import {
	ADD_FEEDBACK_FAIL,
	ADD_FEEDBACK_REQUEST,
	ADD_FEEDBACK_SUCCESS,
} from '../type/feedback.type';
import { axiosInstance, endpoints } from '../../api';

// Add Feedback
const addFeedbackRequest = () => {
	return {
		type: ADD_FEEDBACK_REQUEST,
	};
};

const addFeedbackSuccess = data => {
	return {
		type: ADD_FEEDBACK_SUCCESS,
		payload: data,
	};
};

const addFeedbackFail = err => {
	return {
		type: ADD_FEEDBACK_FAIL,
		payload: err,
	};
};

export const addFeedback = (
	bookingId,
	feedback,
	token,
	successCallback = () => {},
	errorCallback = () => {}
) => {
	return dispatch => {
		dispatch(addFeedbackRequest());
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const data = {
			bookingId,
			feedback,
		};
		axiosInstance
			.post(endpoints.feedback.addFeedback, data, config)
			.then(res => {
				const data = res.data;
				dispatch(addFeedbackSuccess(data));
				successCallback();
			})
			.catch(err => {
				const error = err.response.data.error;
				dispatch(addFeedbackFail(error));
				errorCallback();
			});
	};
};
