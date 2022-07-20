import { Router } from 'vue-router';
import axios from 'axios';
import postUrl from '~/axios/postUrl';
import useMusicDetailStore from '~/store/musicDetailStore';
import useSlideBarStore from '~/store/slideBarStore';

// TODO: 请求并跳转到歌单页面，将内容用pinia来显示。
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

	axios
		.post(postUrl.getMusicInfoByIds, null, {
			params: {
				ids: requestTracks,
			},
		})
		.then((res) => {
			if (res.data.code === 200) {
				musicDetailStore.songs = res.data.songs;
				musicDetailStore.loadedListId = musicListId;

				// handler
				const index = slideBarStore.menuConfig.findIndex((info) => info.menuType === 'createMusic');
				const likeListId = slideBarStore.menuConfig[index].menuItem[0].musicListId;
				if (musicDetailStore.loadedListId === likeListId) {
					musicDetailStore.playlist.name = '我喜欢的音乐';
				}
			}
		});
};
