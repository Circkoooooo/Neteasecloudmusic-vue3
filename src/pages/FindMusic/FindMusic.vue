<script lang="ts" setup>
import './FindMusic.less';
import { computed, reactive } from 'vue';
import axios from 'axios';
import postUrl from '~/axios/postUrl';
import type { HomePageBanner } from '~/types/PageHome/HomePageBanner';
import type { HomePageRecommendMusicList, HomePageRecommendMusicStyleList } from '~/types/PageHome/HomePageRecommendMusicList';
import ListBox from '~/components/ListBox/ListBox.vue';

const homepage = reactive({
	homepageBanner: {
		blockCode: 'HOMEPAGE_BANNER',
	} as HomePageBanner,
	homepageRecommendMusicList: {
		blockCode: 'HOMEPAGE_BLOCK_PLAYLIST_RCMD',
	} as HomePageRecommendMusicList,
	homepageRecommendMusicStyleList: {
		blockCode: 'HOMEPAGE_BLOCK_STYLE_RCMD',
	} as HomePageRecommendMusicStyleList,
});

(function getHomePage() {
	axios.post(postUrl.homepage).then((res) => {
		const { blocks } = res.data.data;
		if (blocks === undefined) {
			throw new Error('cant fetch some music info');
		}
		if (res.data.code === 200) {
			homepage.homepageBanner = blocks.find(
				(item: any) => item.blockCode === homepage.homepageBanner.blockCode,
			);
			homepage.homepageRecommendMusicList = blocks.find(
				(item: any) => item.blockCode === homepage.homepageRecommendMusicList.blockCode,
			);
			homepage.homepageRecommendMusicStyleList = blocks.find(
				(item: any) => item.blockCode === homepage.homepageRecommendMusicStyleList.blockCode,
			);
		}
	});
}());

/**
 * get musicList
 */
const resouces = computed(() => {
	const recommendList = homepage.homepageRecommendMusicList.creatives;
	const styleRecommentList = homepage.homepageRecommendMusicStyleList.creatives;
	if (!styleRecommentList) return null;
	return [...styleRecommentList, ...recommendList].slice(2, 10);
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
			<div class="recommend_music_list">
				<div class="rcmd_music"
						v-for="rcmdMusic in resouces"
						:key="rcmdMusic.creativeId">
					<div class="img">
						<img :src="rcmdMusic.resources[0].uiElement.image.imageUrl">
					</div>
					<div class="music_info">
						<div class="title">
							{{ rcmdMusic.resources[0].uiElement.mainTitle.title }}
						</div>
					</div>
				</div>
			</div>
		</ListBox>
	</div>
</template>
