import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';
import { MusicInfo } from '~/types/Music/MusicInfo';

const useUserLikeListStore = defineStore('userLikeListStore', {
	state: (): {
		likeList: number[],
		likeListMusicList: MusicInfo[]
		isLoading: Ref<boolean>,
		likeListId?: number,
	} => ({
		likeList: [],
		likeListMusicList: [],
		isLoading: ref(true),
		likeListId: 0,
	}),
});

export default useUserLikeListStore;
