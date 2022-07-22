import { defineStore } from 'pinia';
import { userPlayList } from '~/types/User/UserPlayList';

const useUserPlayListStore = defineStore('userPlayListStore', {
	state: (): {
		userPlayList: userPlayList[],
	} => ({
		userPlayList: [],
	}),
});

export default useUserPlayListStore;
