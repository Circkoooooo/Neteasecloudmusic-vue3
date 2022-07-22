import axios from 'axios';
import axiosRetry from 'axios-retry';

axios.defaults.baseURL = '/api';
axios.defaults.params = {
	timestamp: () => { new Date().getTime(); },
};
axios.defaults.timeout = 6000;
axios.defaults.withCredentials = true;

axiosRetry(axios, {
	retries: 3,
	retryDelay: (retryCount) => retryCount * 1000,
});
