<script lang="ts" setup>
import './PlayList.less';
import { computed, ref } from 'vue';
import usePlayListStore from '~/store/playListStore';

const playListStore = usePlayListStore();

const isShow = computed(() => playListStore.isShow);
const playList = ref<HTMLDivElement>();

document.onclick = (event: MouseEvent) => {
	const target = event.target as HTMLElement;

	const height = playList.value?.clientHeight;
	const width = playList.value?.clientWidth;
	const left = playList.value?.offsetLeft;
	const top = playList.value?.offsetTop;
	if (height !== undefined && width !== undefined && left !== undefined && top !== undefined
		&& isShow.value && target.id !== 'music-list-btn') {
		if (event.clientX < left || event.clientX > left + width
			|| event.clientY < top || event.clientY > top + height) {
			playListStore.isShow = false;
		}
	}
	// console.log(event.clientX);
	// console.log(event.clientY);
};
</script>

<template>
	<div class="playlist"
			:class="{
				playlist_show: isShow
			}"
			ref="playList">
		{{ isShow }}
	</div>
</template>
