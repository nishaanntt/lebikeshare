import {
	CHECKOUT_FAIL,
	CHECKOUT_REQUEST,
	CHECKOUT_SUCCESS,
	PAYMENT_CONFIRM_FAIL,
	PAYMENT_CONFIRM_REQUEST,
	PAYMENT_CONFIRM_SUCCESS,
} from '../type/payment.type';

import axiosInstance from '../../api/axiosInstance';
import { endpoints } from '../../api';

// Checkout
const checkoutRequest = () => {
	return {
		type: CHECKOUT_REQUEST,
	};
};

const checkoutSuccess = data => {
	return {
		type: CHECKOUT_SUCCESS,
		payload: data,
	};
};

const checkoutFail = error => {
	return {
		type: CHECKOUT_FAIL,
		payload: error,
	};
};

export const checkout = (
	total,
	token,
	successCallback = () => {},
	errorCallback = () => {}
) => {
	return dispatch => {
		dispatch(checkoutRequest());
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axiosInstance
			.post(endpoints.payment.checkout, { amount: total }, config)
			.then(res => {
				const data = res.data;
				dispatch(checkoutSuccess(data));
				successCallback();
			})
			.catch(err => {
				const error = err.response.data.error;
				dispatch(checkoutFail(error));
				errorCallback();
			});
	};
};

// Payment Confirm
const paymentConfirmRequest = () => {
	return {
		type: PAYMENT_CONFIRM_REQUEST,
	};
};

const paymentConfirmSuccess = data => {
	return {
		type: PAYMENT_CONFIRM_SUCCESS,
		payload: data,
	};
};

const paymentConfirmFail = err => {
	return {
		type: PAYMENT_CONFIRM_FAIL,
		payload: err,
	};
};

export const confirmPayment = (
	bookingId,
	token,
	successCallback = () => {},
	errorCallback = () => {}
) => {
	return dispatch => {
		dispatch(paymentConfirmRequest());
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axiosInstance
			.post(`${endpoints.payment.confirm}${bookingId}`, {}, config)
			.then(res => {
				const data = res.data;
				dispatch(paymentConfirmSuccess(data));
				successCallback();
			})
			.catch(err => {
				// const error = err.response.data.error;
				dispatch(paymentConfirmFail(err));
				errorCallback();
			});
	};
};
