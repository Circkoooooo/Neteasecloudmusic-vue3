import { defineStore } from 'pinia';
import { DetailMusicPlayList } from '~/types/Music/DetailMusicPlayList';
import { MusicInfo } from '~/types/Music/MusicInfo';

const useMusicDetailStore = defineStore('detailStore', {
	state: (): {
		playlist: DetailMusicPlayList;
		songs: MusicInfo[];
		isLikeList: boolean;
		loadedListId: number;
		loadingListId: number;
	} => ({
		playlist: {} as DetailMusicPlayList,
		songs: [] as MusicInfo[],
		isLikeList: false,
		loadedListId: 0,
		loadingListId: 0,
	}),
});

export default useMusicDetailStore;
