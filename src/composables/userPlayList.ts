import axios from 'axios';
import postUrl from '~/axios/postUrl';
import useUserPlayListStore from '~/store/userPlayListStore';

export default (uid: number) => {
	const timestamp = new Date().getTime();
	const userPlayListStore = useUserPlayListStore();
	axios.post(postUrl.userPlayList, null, {
		params: {
			uid,
			timestamp,
		},
	}).then((res) => {
		userPlayListStore.userPlayList = res.data.playlist;
	});
};
