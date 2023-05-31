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
	RESEND_VERIFICATION_EMAIL_FAIL,
	RESEND_VERIFICATION_EMAIL_REQUEST,
	RESEND_VERIFICATION_EMAIL_SUCCESS,
	RESET_PASSWORD_FAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
} from '../type/auth.type';
import { axiosInstance, endpoints } from '../../api';

// *** REGISTER ***
const registerRequest = () => {
	return {
		type: REGISTER_REQUEST,
	};
};

const registerSuccess = data => {
	return {
		type: REGISTER_SUCCESS,
		payload: data,
	};
};

const registerFail = error => {
	return {
		type: REGISTER_FAIL,
		payload: error,
	};
};

export const handleRegister = (data, callbackSuccess, callbackFail) => {
	return dispatch => {
		dispatch(registerRequest());
		const body = {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			mobileNumber: data.mobileNumber,
			dateOfBirth: data.dateOfBirth,
			address: data.address,
		};
		axiosInstance
			.post(endpoints.auth.register, body)
			.then(res => {
				const data = res.data;
				dispatch(registerSuccess(data));
				callbackSuccess();
			})
			.catch(err => {
				dispatch(registerFail(err));
				callbackFail();
			});
	};
};

// *** LOGIN ***
const loginRequest = () => {
	return {
		type: LOGIN_REQUEST,
	};
};

const loginSuccess = loginDetails => {
	return {
		type: LOGIN_SUCCESS,
		payload: loginDetails,
	};
};

const loginFail = error => {
	return {
		type: LOGIN_FAIL,
		payload: error,
	};
};

export const handleLogin = ({ email, password }) => {
	return dispatch => {
		dispatch(loginRequest());
		const loginDetails = {
			email,
			password,
		};
		axiosInstance
			.post(endpoints.auth.login, loginDetails)
			.then(res => {
				const data = res.data;
				dispatch(loginSuccess(data));
			})
			.catch(err => {
				dispatch(loginFail(err));
			});
	};
};

// *** LOGOUT ***
export const handleLogout = () => {
	return {
		type: LOGOUT,
	};
};

// *** FORGOT PASSWORD ***
const forgotPasswordRequest = () => {
	return {
		type: FORGOT_PASSWORD_REQUEST,
	};
};

const forgotPasswordSuccess = data => {
	return {
		type: FORGOT_PASSWORD_SUCCESS,
		payload: data,
	};
};

const forgotPasswordFail = err => {
	return {
		type: FORGOT_PASSWORD_FAIL,
		payload: err,
	};
};

export const forgotPassword = (email, callback) => {
	return dispatch => {
		dispatch(forgotPasswordRequest());
		const data = {
			email,
		};
		axiosInstance
			.post(endpoints.auth.forgotPassword, data)
			.then(res => {
				const data = res.data;
				dispatch(forgotPasswordSuccess(data));
				callback();
			})
			.catch(err => {
				dispatch(forgotPasswordFail(err));
				callback();
			});
	};
};

// *** RESET PASSWORD ***
const resetPasswordRequest = () => {
	return {
		type: RESET_PASSWORD_REQUEST,
	};
};

const resetPasswordSuccess = data => {
	return {
		type: RESET_PASSWORD_SUCCESS,
		payload: data,
	};
};

const resetPasswordFail = err => {
	return {
		type: RESET_PASSWORD_FAIL,
		payload: err,
	};
};

export const resetPassword = (
	otp,
	password,
	confirmPassword,
	successCallback,
	failCallback
) => {
	return dispatch => {
		dispatch(resetPasswordRequest());
		const data = {
			token: otp,
			password: password,
			confirmPassword: confirmPassword,
		};
		axiosInstance
			.put(endpoints.auth.resetPassword, data)
			.then(res => {
				const data = res.data;
				dispatch(resetPasswordSuccess(data));
				successCallback();
			})
			.catch(err => {
				const error = err.response.data.error;
				dispatch(resetPasswordFail(error));
				failCallback();
			});
	};
};

// *** RESEND VERIFICATION EMAIL ***
const resendVerificationEmailRequest = () => {
	return {
		type: RESEND_VERIFICATION_EMAIL_REQUEST,
	};
};

const resendVerificationEmailSuccess = data => {
	return {
		type: RESEND_VERIFICATION_EMAIL_SUCCESS,
		payload: data,
	};
};

const resendVerificationEmailFail = err => {
	return {
		type: RESEND_VERIFICATION_EMAIL_FAIL,
		payload: err,
	};
};

export const handleResendVerificationEmail = ({ userId, email }) => {
	return dispatch => {
		dispatch(resendVerificationEmailRequest());
		const body = {
			userId,
			email,
		};
		axiosInstance
			.post(endpoints.auth.resendVerificationEmail, body)
			.then(res => {
				const data = res.data;
				dispatch(resendVerificationEmailSuccess(data));
			})
			.catch(err => {
				dispatch(resendVerificationEmailFail());
			});
	};
};
