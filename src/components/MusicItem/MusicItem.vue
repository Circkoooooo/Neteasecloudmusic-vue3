<script lang="ts" setup>
import { computed } from 'vue';
import { MusicInfo } from '~/types/Music/MusicInfo';
import './MusicItem.less';
import useMusicPlayerStore from '~/store/musicPlayerStore';
import useUserLikeListStore from '~/store/userLikeListStore';

const { nextMusic } = useMusicPlayerStore();
const userLikeListStore = useUserLikeListStore();

const props = withDefaults(defineProps<{
	index: number,
	musicInfo: MusicInfo
}>(), {});

const singer = computed(() => props.musicInfo.ar.map((item) => item.name).join('/'));
const like = computed(() => userLikeListStore.likeList.includes(props.musicInfo.id));
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
			{{ like ? '喜欢' : "no" }}
		</div>
	</div>
</template>
