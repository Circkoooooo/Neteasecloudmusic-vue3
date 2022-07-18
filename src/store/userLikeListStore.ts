import { defineStore } from 'pinia';

const useUserLikeListStore = defineStore('userLikeListStore', {
	state: (): {
		likeList:number[]
	} => ({
		likeList: [],
	}),
});

export default useUserLikeListStore;
