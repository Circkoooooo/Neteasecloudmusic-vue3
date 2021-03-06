import axios from 'axios';

axios.defaults.baseURL = '/api';
axios.defaults.params = {
	timestamp: () => { new Date().getTime(); },
};
axios.defaults.timeout = 6000;
axios.defaults.withCredentials = true;
