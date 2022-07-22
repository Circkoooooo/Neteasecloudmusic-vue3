<script lang="ts" setup>
import { computed } from 'vue';
import { MusicInfo } from '~/types/Music/MusicInfo';
import './listdetail-MusicItem.less';
import './playlist-MusicItem.less';
import useUserLikeListStore from '~/store/userLikeListStore';
import useMusicPlayerStore from '~/store/musicPlayerStore';
import usePlayListStore from '~/store/playListStore';

const userLikeListStore = useUserLikeListStore();
const playList = usePlayListStore();
const musicPlayerStore = useMusicPlayerStore();

const props = withDefaults(defineProps<{
	index: number,
	musicInfo: MusicInfo,
	namespace: 'listdetailMusicItem' | 'playlistMusicItem'
}>(), {});

const singer = computed(() => props.musicInfo.ar.map((item) => item.name).join('/'));
const like = computed(() => userLikeListStore.likeList.includes(props.musicInfo.id));
const isCurrent = computed(
	() => {
		if (playList.currentIndex === -1) {
			return false;
		}
		return playList.playList[playList.currentIndex].id === props.musicInfo.id;
	},
);
const changeMusic = computed(() => musicPlayerStore.changeMusic);
</script>

<template>
	<div class="music_item"
			:class="namespace"
			@dblclick="changeMusic(musicInfo.id)">
		<div class="music_showlist">
			<div class="number">
				<div class="number_num"
						v-if="!isCurrent"> {{ index }}</div>
				<div class="number_play"
						v-else>
					<img src="../../assets/play_now.png">
				</div>
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
