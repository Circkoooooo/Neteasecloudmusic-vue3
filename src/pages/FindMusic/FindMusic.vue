<script lang="ts" setup>
import {
	computed,
} from 'vue';
import axios from 'axios';
import useBannerStore from '~/store/bannerStore';
import './FindMusic.less';
import postUrl from '~/axios/postUrl';
import ListBox from '~/components/ListBox/ListBox.vue';
import RecommendMusicList from '~/components/RecommendMuiscList/RecommendMusicList.vue';

const bannerStore = useBannerStore();
/**
 * request content of banner, RecommendList.
 */
(function getHomePage() {
	axios.post(postUrl.homepage).then((res) => {
		const { blocks } = res.data.data;
		if (blocks === undefined) {
			throw new Error('cant fetch some music info');
		}
		if (res.data.code === 200) {
			bannerStore.homepageBanner = blocks.find(
				(item: any) => item.blockCode === bannerStore.homepageBanner.blockCode,
			);
			bannerStore.homepageRecommendMusicList = blocks.find(
				(item: any) => item.blockCode === bannerStore.homepageRecommendMusicList.blockCode,
			);
			bannerStore.homepageRecommendMusicStyleList = blocks.find(
				(item: any) => item.blockCode === bannerStore.homepageRecommendMusicStyleList.blockCode,
			);
		}
	});
}());

/**
 * get musicList
 */
const resouces = computed(() => {
	const recommendList = bannerStore.homepageRecommendMusicList.creatives;
	const styleRecommentList = bannerStore.homepageRecommendMusicStyleList.creatives;
	if (!styleRecommentList) return null;
	return [...styleRecommentList, ...recommendList];
});

</script>

<template>
	<div class="findmusic">
		<!-- banner -->
		<!-- <div class="banner">
			<div
				class="item"
				v-for="item in homepage.homepageBanner.extInfo.banners"
				:key="item.bannerId"
			>
				<img :src="item.pic" />
			</div>
		</div> -->
		<!-- rcmd -->
		<ListBox title="推荐歌单"
				paddingVal="8px"
				gotoDetailBtnName="更多">
			<RecommendMusicList :resouceList="resouces"></RecommendMusicList>
		</ListBox>
	</div>
</template>
