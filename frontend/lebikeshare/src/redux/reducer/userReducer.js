import {
	PROFILE_FAIL,
	PROFILE_REQUEST,
	PROFILE_SUCCESS,
} from '../type/user.type';

import { LOGOUT } from '../type/auth.type';

const initialState = {
	isLoading: false,
	user: {},
	error: null,
};

const UserReducer = (state = initialState, action) => {
	switch (action.type) {
		case PROFILE_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case PROFILE_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action.payload.user,
			};
		case PROFILE_FAIL:
			return {
				...state,
				isLoading: false,
				user: {},
				error: action.payload.response.data.error,
			};
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default UserReducer;
