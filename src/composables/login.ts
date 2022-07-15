import axios from 'axios';
import { Account, Profile } from '~/types/User/UserProfile';

// checkLoginStatus
export async function getLoginStatus() {
	return axios.post('/login/status').then((res) => {
		if (res.data.data.code !== 200) {
			return null;
		}
		if (res.data.data.user === null && res.data.profile === null) {
			return null;
		}
		const profile = res.data.data.profile as Profile;
		const account = res.data.data.account as Account;
		return {
			profile,
			account,
		};
	});
}

export default null;
