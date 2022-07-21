import { Router } from 'vue-router';
import axios from 'axios';
import postUrl from '~/axios/postUrl';
import useMusicDetailStore from '~/store/musicDetailStore';
import useSlideBarStore from '~/store/slideBarStore';

export default async (musicListId: number, router: Router, path: string) => {
	const musicDetailStore = useMusicDetailStore();
	const slideBarStore = useSlideBarStore();

	musicDetailStore.loadingListId = musicListId;
	router.push(path);
	await axios
		.post(postUrl.getMusicListDetail, null, {
			params: {
				id: musicListId,
			},
		})
		.then((res) => {
			if (res.data.code === 200) {
				musicDetailStore.playlist = res.data.playlist;
			}
		});
	const { trackIds } = musicDetailStore.playlist;

	let requestTracks = '';
	if (trackIds.length !== 0) {
		requestTracks = trackIds.map((item) => item.id).join(',');
	}

	await axios
		.post(postUrl.getMusicInfoByIds, null, {
			params: {
				ids: requestTracks,
			},
		})
		.then((res) => {
			if (res.data.code === 200) {
				musicDetailStore.songs = res.data.songs;

				// handler
				const index = slideBarStore.menuConfig.findIndex((info) => info.menuType === 'createMusic');
				if (!slideBarStore.menuConfig[index]
					|| !slideBarStore.menuConfig[index].menuItem[0]) return;
				const likeListId = slideBarStore.menuConfig[index].menuItem[0].musicListId;
				if (musicDetailStore.loadedListId === likeListId) {
					musicDetailStore.playlist.name = '我喜欢的音乐';
				}
			}
		});
	// getUserDetail
	await axios.post(postUrl.getUserDetail, null, {
		params: {
			uid: musicDetailStore.playlist.userId,
		},
	}).then((res) => {
		musicDetailStore.userDetail = res.data;
	});
	musicDetailStore.loadedListId = musicListId;
};
