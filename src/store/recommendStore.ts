import { defineStore } from 'pinia';
import { RecommendMusicList } from '~/types/PageHome/RecommendMusicList';

const useRecommendStore = defineStore('recommendStore', {
	state: (): {
		recommendMusicList:RecommendMusicList[]
	} => ({
		recommendMusicList: [] as RecommendMusicList[],
	}),
});
export default useRecommendStore;
