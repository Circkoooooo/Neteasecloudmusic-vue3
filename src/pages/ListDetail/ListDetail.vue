<script lang="ts" setup>
import { computed } from 'vue';
import useMusicDetailStore from '~/store/musicDetailStore';
import MusicListDetail from '~/components/MusicListDetail/MusicListDetail.vue';

const musicDetailStore = useMusicDetailStore();
const songs = computed(() => {
	if (musicDetailStore.loadedListId !== musicDetailStore.loadingListId) {
		return [];
	}
	return musicDetailStore.songs;
});

</script>

<template>
	<MusicListDetail :playList="musicDetailStore.playlist"
			:songs="songs"></MusicListDetail>
</template>
