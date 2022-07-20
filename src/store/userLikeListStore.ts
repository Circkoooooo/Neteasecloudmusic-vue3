import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';
import { MusicInfo } from '~/types/Music/MusicInfo';

const useUserLikeListStore = defineStore('userLikeListStore', {
	state: (): {
		likeList:number[],
		likeListMusicList: MusicInfo[]
		isLoading:Ref<boolean>,
	} => ({
		likeList: [],
		likeListMusicList: [],
		isLoading: ref(true),
	}),
});

export default useUserLikeListStore;
