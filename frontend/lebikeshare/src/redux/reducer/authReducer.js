import {
	FORGOT_PASSWORD_FAIL,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	LOGIN_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGOUT,
	REGISTER_FAIL,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	RESET_PASSWORD_FAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
} from '../type/auth.type';

const initialState = {
	isLoggedIn: false,
	userData: {},
	isLoading: false,
	token: '',
	error: '',
	message: '',
};

const AuthReducer = (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_REQUEST:
			return {
				...state,
				isLoading: true,
				error: '',
				message: '',
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				isLoading: false,
				message: action.payload,
			};
		case REGISTER_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.payload.response.data.error,
			};
		case LOGIN_REQUEST:
			return {
				...state,
				isLoading: true,
				error: '',
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoading: false,
				isLoggedIn: true,
				userData: action.payload.user,
				token: action.payload.token,
				error: '',
				message: action.payload.message,
			};
		case LOGIN_FAIL:
			return {
				...state,
				isLoading: false,
				isLoggedIn: false,
				error: action.payload.response.data.error,
				userData: {},
				message: '',
				token: null,
			};
		case LOGOUT:
			return initialState;
		case FORGOT_PASSWORD_REQUEST:
			return {
				...state,
				isLoading: true,
				error: '',
			};
		case FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				isLoading: false,
				message: action.payload.message,
				error: '',
			};
		case FORGOT_PASSWORD_FAIL:
			return {
				...state,
				isLoading: false,
				message: null,
				error: action.payload.response.data.error,
			};
		case RESET_PASSWORD_REQUEST:
			return {
				...state,
				isLoading: true,
				error: '',
			};
		case RESET_PASSWORD_SUCCESS:
			return {
				...state,
				isLoading: false,
				message: action.payload.message,
			};
		case RESET_PASSWORD_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default AuthReducer;
