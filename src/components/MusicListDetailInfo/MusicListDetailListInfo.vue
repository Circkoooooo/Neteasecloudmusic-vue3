<script lang="ts" setup>
import { DetailMusicPlayList } from '../../types/Music/DetailMusicPlayList';
import './MusicListDetailListInfo.less';

withDefaults(defineProps<{
	playList: DetailMusicPlayList
}>(), {});
</script>

<template>
	<div class="musiclistdetail_info">
		<div class="list_cover">
			<img :src="playList.coverImgUrl">
		</div>
		<div class="list_info">
			<div class="list_title">{{ playList.name }}</div>
			<div class="list_description">{{ playList.description }}</div>
		</div>
	</div>
</template>
