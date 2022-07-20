<script lang="ts" setup>
import { computed } from 'vue';
import MusicListDetail from '~/components/MusicListDetail/MusicListDetail.vue';
import useUserLikeListStore from '~/store/userLikeListStore';
import { MusicInfo } from '~/types/Music/MusicInfo';

const userLikeListStore = useUserLikeListStore();

const songs = computed<MusicInfo[]>(
	() => userLikeListStore.likeListMusicList.filter(
		(item) => userLikeListStore.likeList.includes(item.id),
	),
);
const isLoading = computed(() => userLikeListStore.isLoading);
</script>
<template>
	<MusicListDetail :songs="songs"
			:isLoading="isLoading"></MusicListDetail>
</template>
