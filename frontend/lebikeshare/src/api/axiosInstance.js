import axios from 'axios';

export const baseUrl = `http://localhost:3000/api/v1`;

const axiosInstance = axios.create({
	baseURL: baseUrl,
	timeout: 1000,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default axiosInstance;
