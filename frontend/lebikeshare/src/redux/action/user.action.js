import {
	PROFILE_FAIL,
	PROFILE_REQUEST,
	PROFILE_SUCCESS,
} from '../type/user.type';
import { axiosInstance, endpoints } from '../../api';

// *** GET PROFILE ***
const profileRequest = () => {
	return {
		type: PROFILE_REQUEST,
	};
};

const profileSucess = user => {
	return {
		type: PROFILE_SUCCESS,
		payload: user,
	};
};

const profileError = error => {
	return {
		type: PROFILE_FAIL,
		payload: error,
	};
};

export const getUserProfile = (id, token) => {
	return dispatch => {
		dispatch(profileRequest());
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axiosInstance
			.get(`${endpoints.user.profile}${id}`, config)
			.then(res => {
				const data = res.data;
				console.log('profile response: ', data);

				dispatch(profileSucess(data));
			})
			.catch(err => {
				console.log(`Profile Error => ${err}`);
				dispatch(profileError(err));
			});
	};
};

// *** CHANGE PASSWORD ***
