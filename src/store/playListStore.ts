import { defineStore } from 'pinia';

const usePlayListStore = defineStore('playlistStore', {
	state: () => ({
		isShow: false,
	}),
});

export default usePlayListStore;
