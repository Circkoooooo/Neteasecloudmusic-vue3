import { Router } from 'vue-router';
import axios from 'axios';
import postUrl from '~/axios/postUrl';
import useMusicDetailStore from '~/store/musicDetailStore';
import useSlideBarStore from '~/store/slideBarStore';
import useUserLikeListStore from '~/store/userLikeListStore';
import usePlayListStore from '~/store/playListStore';

export default async (musicListId: number, router: Router, path: string) => {
	const musicDetailStore = useMusicDetailStore();
	const userLikeListStore = useUserLikeListStore();
	const musicPlayerStroe = usePlayListStore();
	const slideBarStore = useSlideBarStore();

	musicDetailStore.loadingListId = musicListId;
	router.push(path);
	try {
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
			}).catch((err) => {
				throw err;
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
					musicPlayerStroe.sortPlayList = res.data.songs;
					// handler
					const index = slideBarStore.menuConfig.findIndex((info) => info.menuType === 'createMusic');
					if (!slideBarStore.menuConfig[index]
						|| !slideBarStore.menuConfig[index].menuItem[0]) return;
					const likeListId = slideBarStore.menuConfig[index].menuItem[0].musicListId;
					if (musicDetailStore.loadedListId === likeListId) {
						musicDetailStore.playlist.name = '我喜欢的音乐';
					}
				}
			}).catch((err) => {
				throw err;
			});

		// getUserDetail
		await axios.post(postUrl.getUserDetail, null, {
			params: {
				uid: musicDetailStore.playlist.userId,
			},
		}).then((res) => {
			musicDetailStore.userDetail = res.data;
		}).catch((err) => {
			throw err;
		});
		musicDetailStore.loadedListId = musicListId;
		if (userLikeListStore.likeListId === musicDetailStore.loadedListId) {
			musicDetailStore.isLikeList = true;
		} else {
			musicDetailStore.isLikeList = false;
		}
	} catch (err) {
		musicDetailStore.loadingListId = 0;
		musicDetailStore.loadedListId = 0;
	}
};
