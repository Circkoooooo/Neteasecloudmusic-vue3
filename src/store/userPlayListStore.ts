import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';
import { MusicInfo } from '~/types/Music/MusicInfo';
import { userPlayList } from '~/types/User/UserPlayList';

const useUserPlayListStore = defineStore('userPlayListStore', {
	state: (): {
		userPlayList:userPlayList[]
	} => ({
		userPlayList: [],
	}),
});

export default useUserPlayListStore;
