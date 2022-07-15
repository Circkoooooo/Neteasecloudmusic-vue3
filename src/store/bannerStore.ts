import { defineStore } from 'pinia';
import { HomePageBanner } from '~/types/PageHome/HomePageBanner';
import { HomePageRecommendMusicList, HomePageRecommendMusicStyleList } from '~/types/PageHome/HomePageRecommendMusicList';

const useBannerStore = defineStore('bannerStore', {
	state: (): {
		homepageBanner:HomePageBanner,
		homepageRecommendMusicList:HomePageRecommendMusicList
		homepageRecommendMusicStyleList:HomePageRecommendMusicStyleList,
	} => ({
		homepageBanner: {
			blockCode: 'HOMEPAGE_BANNER',
		} as HomePageBanner,
		homepageRecommendMusicList: {
			blockCode: 'HOMEPAGE_BLOCK_PLAYLIST_RCMD',
		} as HomePageRecommendMusicList,
		homepageRecommendMusicStyleList: {
			blockCode: 'HOMEPAGE_BLOCK_STYLE_RCMD',
		} as HomePageRecommendMusicStyleList,
	}),
});
export default useBannerStore;
