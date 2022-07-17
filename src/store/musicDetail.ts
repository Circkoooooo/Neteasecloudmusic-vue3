import { defineStore } from 'pinia';
import { DetailMusicPlayList } from '~/types/Music/DetailMusicPlayList';
import { MusicInfo } from '~/types/Music/MusicInfo';

const useMusicDetailStore = defineStore('detailStore', {
	state: (): {
		playList: DetailMusicPlayList;
		songs: MusicInfo[];
		loadedListId: number;
		loadingListId: number;
	} => ({
		playList: {} as DetailMusicPlayList,
		songs: [] as MusicInfo[],
		loadedListId: 0,
		loadingListId: 0,
	}),
});

export default useMusicDetailStore;
