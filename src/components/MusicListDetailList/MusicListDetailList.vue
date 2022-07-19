<script lang="ts" setup>
import './MusicListDetailList.less';
import MusicItem from '~/components/MusicItem/MusicItem.vue';
import { MusicInfo } from '~/types/Music/MusicInfo';

withDefaults(defineProps<{
	songs: MusicInfo[]
}>(), {});

</script>

<template>
	<div class="musiclistdetail_list">
		<div v-for="(song, key) in songs"
				:key="song.id">
			<MusicItem :musicInfo="song"
					:index="key + 1"></MusicItem>
		</div>
	</div>
</template>
