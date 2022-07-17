<script lang="ts" setup>
import './MusicListDetail.less';
import { computed } from 'vue';
import useMusicDetailStore from '~/store/musicDetail';

const musicDetailStore = useMusicDetailStore();
const songs = computed(() => {
	if (musicDetailStore.loadedListId !== musicDetailStore.loadingListId) {
		return [];
	}
	return musicDetailStore.songs;
});

</script>

<template>
	<div class="musiclist_detail">
		<div v-if="songs.length === 0">加载中</div>
		<div v-for="song in songs"
				:key="song.id">{{ song.name }}</div>
	</div>
</template>
