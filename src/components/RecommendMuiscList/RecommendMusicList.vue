<script lang="ts" setup>
import './RecommendMusicList.less';
import { onMounted, ref } from 'vue';
import type { Creative } from '~/types/PageHome/HomePageRecommendMusicList';

const rcmdList = ref<HTMLElement>();

withDefaults(defineProps<{
	resouceList: Creative[] | null;
}>(), {});

onMounted(() => {
	if (rcmdList.value !== undefined && rcmdList.value !== null) {
		rcmdList.value.onwheel = (event) => {
			event.preventDefault();
			if (event.deltaY !== 0) {
				rcmdList.value!.scrollLeft += event.deltaY;
			} else {
				rcmdList.value!.scrollLeft += event.deltaX;
			}
		};
	}
});
</script>

<template>
	<div class="recommend_music_list"
			ref="rcmdList">
		<div class="rcmd_music"
				v-for="rcmdMusic in resouceList"
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
</template>
