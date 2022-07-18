import axios from 'axios';
import postUrl from '~/axios/postUrl';
import useUserLikeListStore from '~/store/userLikeListStore';

export default async (userId:number) => {
	const userLikeListStore = useUserLikeListStore();
	const timestamp = new Date().getTime();
	return axios.post(postUrl.likelist, null, {
		params: {
			uid: userId,
			timestamp,
		},
	}).then((res) => {
		if (res.data.code === 200) {
			userLikeListStore.likeList = res.data.ids;
		}
	});
};
