import axios from 'axios';
import postUrl from '~/axios/postUrl';
import { Account, Profile } from '~/types/User/UserProfile';

// checkLoginStatus
export default async function getLoginStatus() {
	const timestamp = new Date().getTime();
	return axios.post('/login/status', null, {
		params: {
			timestamp,
		},
	}).then((res) => {
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

export const checkQrCode = async (unikey: string) => {
	const timestamp = new Date().getTime();
	const response = await axios.post(postUrl.checkQrCode, null, {
		params: {
			key: unikey,
			timestamp,
		},
	}).then((res) => {
		const obj = {
			code: res.data.code as number,
			message: res.data.message as string, // 801 wait ,800 err
			cookie: '',
		};
		return obj;
	});
	return response;
};

export const getQrCodeKey = async ():Promise<string|null> => {
	const unikey = await axios.post(postUrl.getQrcodeKey).then((res) => {
		if (res.data.code === 200) {
			if (res.data.data.code === 200) {
				return res.data.data.unikey;
			}
		}
		return null;
	});
	return unikey;
};

export const getQrCode = async (unikey:string):Promise<string|null> => {
	const qrurl = await axios.post(postUrl.getQrCode, null, {
		params: {
			key: unikey,
		},
	}).then((res) => {
		if (res.data.code === 200) {
			return res.data.data.qrurl;
		}
		return null;
	});

	return qrurl;
};
