import {
	ADD_FEEDBACK_FAIL,
	ADD_FEEDBACK_REQUEST,
	ADD_FEEDBACK_SUCCESS,
} from '../type/feedback.type';

import { LOGOUT } from '../type/auth.type';

const initialState = {
	isLoading: false,
	feedbacks: [],
	feedback: {},
	message: '',
	error: '',
};

const FeedbackReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_FEEDBACK_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case ADD_FEEDBACK_SUCCESS:
			return {
				...state,
				isLoading: false,
				feedback: action.payload.feedback,
				message: action.payload.message,
			};
		case ADD_FEEDBACK_FAIL:
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

export default FeedbackReducer;
