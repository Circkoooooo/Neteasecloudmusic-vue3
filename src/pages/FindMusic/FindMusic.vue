<script lang="ts" setup>
import {
	computed,
} from 'vue';
import axios from 'axios';
import useRecommendStore from '~/store/recommendStore';
import './FindMusic.less';
import postUrl from '~/axios/postUrl';
import ListBox from '~/components/ListBox/ListBox.vue';
import RecommendMusicList from '~/components/RecommendMuiscList/RecommendMusicList.vue';

const recommendStore = useRecommendStore();
/**
 * request content of banner, RecommendList.
 */
(async function getHomePage() {
	const isLogin = await axios.post(postUrl.isLogin).then((res) => {
		if (res.data.data.account !== null && res.data.data.profile !== null) {
			return true;
		}
		return false;
	});
	if (isLogin) {
		recommendStore.recommendMusicList = [];
		axios.post(postUrl.getMusicRecommendLogin).then((res) => {
			if (res.data.code === 200) {
				recommendStore.recommendMusicList = res.data.recommend;
			}
			return null;
		});
	} else {
		axios.post(postUrl.getMusicRecommend, null, {
			params: {
				limit: 20,
			},
		}).then((res) => {
			if (res.data.code === 200) {
				recommendStore.recommendMusicList = res.data.result;
			}
			return null;
		});
	}
}());

/**
 * get musicList
 */
const recommendList = computed(() => recommendStore.recommendMusicList);

</script>

<template>
	<div class="findmusic">
		<ListBox title="推荐歌单"
				paddingVal="8px"
				gotoDetailBtnName="更多">
			<RecommendMusicList :recommendList="recommendList"></RecommendMusicList>
		</ListBox>
	</div>
</template>
