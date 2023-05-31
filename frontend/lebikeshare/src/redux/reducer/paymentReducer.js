import {
	CHECKOUT_FAIL,
	CHECKOUT_REQUEST,
	CHECKOUT_SUCCESS,
	CREATE_PAYMENT_INTENT_FAIL,
	CREATE_PAYMENT_INTENT_REQUEST,
	CREATE_PAYMENT_INTENT_SUCCESS,
	PAYMENT_CONFIRM_FAIL,
	PAYMENT_CONFIRM_REQUEST,
	PAYMENT_CONFIRM_SUCCESS,
} from '../type/payment.type';

import { LOGOUT } from '../type/auth.type';

const initialState = {
	isLoading: false,
	error: '',
	customerId: '',
	ephemeralKey: '',
	paymentIntent: '',
	publishableKey: '',
	message: '',
};

const PaymentReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHECKOUT_REQUEST:
			return {
				...state,
				isLoading: true,
				customerId: '',
				ephemeralKey: '',
				paymentIntent: '',
				publishableKey: '',
			};
		case CHECKOUT_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				customerId: action.payload.customer,
				ephemeralKey: action.payload.ephemeralKey,
				paymentIntent: action.payload.paymentIntent,
				publishableKey: action.payload.publishableKey,
			};
		case CHECKOUT_FAIL:
			return {
				...state,
				isLoading: false,
				paymentIntent: null,
				error: action.payload,
			};
		case PAYMENT_CONFIRM_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case PAYMENT_CONFIRM_SUCCESS:
			return {
				...state,
				isLoading: false,
				message: action.payload.message,
			};
		case PAYMENT_CONFIRM_FAIL:
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

export default PaymentReducer;
