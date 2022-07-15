import axios from 'axios';

axios.defaults.baseURL = 'https://circle-neteasemusic.vercel.app';
axios.defaults.params = {
	timestamp: () => { new Date().getTime(); },
};
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;
