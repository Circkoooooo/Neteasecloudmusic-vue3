import axios from 'axios';
import postUrl from '~/axios/postUrl';
import useUserLikeListStore from '~/store/userLikeListStore';

export default async (id: number) => {
	if (!id) return;
	const timestamp = new Date().getTime();
	const userLikeListStore = useUserLikeListStore();
	if (id === undefined) return;
	await axios.post(postUrl.likelist, null, {
		params: {
			id,
			timestamp,
		},
	}).then((res) => {
		if (res.data.code === 200) {
			userLikeListStore.likeList = res.data.ids;
		}
	});
	if (userLikeListStore.likeList.length === 0) return;
	const requestTracks = userLikeListStore.likeList.join(',');
	// fetch list
	await axios.post(postUrl.getMusicInfoByIds, null, {
		params: {
			ids: requestTracks,
		},
	}).then((res) => {
		if (res.data.code === 200) {
			userLikeListStore.likeListMusicList = res.data.songs;
		}
	});
};
