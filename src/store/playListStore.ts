import { defineStore } from 'pinia';
import { MusicInfo } from '~/types/Music/MusicInfo';

const usePlayListStore = defineStore('playlistStore', {
	state: () => ({
		isShow: false,
		playList: [] as MusicInfo[],
		currentIndex: -1,
		sortPlayList: [] as MusicInfo[],
	}),
});

export default usePlayListStore;
