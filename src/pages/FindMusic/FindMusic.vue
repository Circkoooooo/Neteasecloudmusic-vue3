<script lang="ts" setup>
import {
	computed,
} from 'vue';
import useRecommendStore from '~/store/recommendStore';
import './FindMusic.less';
import ListBox from '~/components/ListBox/ListBox.vue';
import RecommendMusicList from '~/components/RecommendMuiscList/RecommendMusicList.vue';

const recommendStore = useRecommendStore();

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
