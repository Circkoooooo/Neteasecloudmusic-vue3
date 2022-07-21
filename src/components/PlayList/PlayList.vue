<script lang="ts" setup>
import './PlayList.less';
import { computed, ref } from 'vue';
import usePlayListStore from '~/store/playListStore';
import MusicItem from '../MusicItem/MusicItem.vue';
import useMusicPlayerStore from '~/store/musicPlayerStore';

const playListStore = usePlayListStore();
const isShow = computed(() => playListStore.isShow);
const playList = ref<HTMLDivElement>();
const { clearPlayList } = useMusicPlayerStore();

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
};

const songs = computed(() => playListStore.playList);
</script>

<template>
	<div class="playlist"
			:class="{
				playlist_show: isShow
			}"
			ref="playList">
		<div class="playlist_btn">
			<div class="clearall"
					@click="clearPlayList">清空列表</div>
		</div>
		<MusicItem v-for="(item, index) in songs"
				:key="item.id"
				:musicInfo="item"
				:index="index + 1"
				namespace='playlistMusicItem'></MusicItem>
	</div>
</template>
