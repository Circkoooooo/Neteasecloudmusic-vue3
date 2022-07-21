<script lang="ts" setup>
import { computed } from 'vue';
import { MusicInfo } from '~/types/Music/MusicInfo';
import './listdetail-MusicItem.less';
import './playlist-MusicItem.less';
import useUserLikeListStore from '~/store/userLikeListStore';
import useMusicPlayerStore from '~/store/musicPlayerStore';

const userLikeListStore = useUserLikeListStore();
const { changeMusic } = useMusicPlayerStore();

const props = withDefaults(defineProps<{
	index: number,
	musicInfo: MusicInfo,
	namespace: 'listdetailMusicItem' | 'playlistMusicItem'
}>(), {});

const singer = computed(() => props.musicInfo.ar.map((item) => item.name).join('/'));
const like = computed(() => userLikeListStore.likeList.includes(props.musicInfo.id));
</script>

<template>
	<div class="music_item"
			:class="namespace"
			@dblclick="changeMusic(musicInfo.id)">
		<div class="music_showlist">
			<div class="number">
				{{ index }}
			</div>
			<div class="is_like">
				<img src="../../assets/like.png"
						v-if="like">
				<img src="../../assets/like_default.png"
						v-else>
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
