<script lang="ts" setup>
import { computed } from 'vue';
import { MusicInfo } from '~/types/Music/MusicInfo';
import './MusicItem.less';
import useMusicPlayerStore from '~/store/musicPlayerStore';

const { nextMusic } = useMusicPlayerStore();

const props = withDefaults(defineProps<{
	index: number,
	musicInfo: MusicInfo
}>(), {});

const singer = computed(() => props.musicInfo.ar.map((item) => item.name).join('/'));
</script>

<template>
	<div class="music_item"
			@dblclick="nextMusic(musicInfo.id)">
		<div class="music_showlist">
			<div class="number">
				{{ index }}
			</div>
			<div class="music_cover">
				<img :src="musicInfo.al.picUrl"
						:alt="musicInfo.al.name">
			</div>
			<div class="namebox">
				<div class="title">{{ musicInfo.name }}</div>
				<div class="singer">{{ singer }}</div>
			</div>
		</div>
	</div>
</template>
