<script lang="ts" setup>
import { computed } from 'vue';
import useMusicDetailStore from '~/store/musicDetailStore';
import MusicListDetail from '~/components/MusicListDetail/MusicListDetail.vue';
import { MusicInfo } from '~/types/Music/MusicInfo';

const musicDetailStore = useMusicDetailStore();
const songs = computed<MusicInfo[]>(() => {
	if (musicDetailStore.loadedListId !== musicDetailStore.loadingListId) {
		return [] as MusicInfo[];
	}
	return musicDetailStore.songs;
});

const isLoading = computed(() => {
	if (musicDetailStore.loadedListId === musicDetailStore.loadingListId) {
		return false;
	}
	return true;
});
</script>

<template>
	<MusicListDetail :playList="musicDetailStore.playlist"
			:songs="songs"
			:isLoading="isLoading"></MusicListDetail>
</template>
