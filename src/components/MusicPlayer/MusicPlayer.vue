<script lang="ts" setup>
import './MusicPlayer.less';
import {
	computed, onMounted, ref,
} from 'vue';
import useMusicPlayer from '~/composables/useMusicPlayer';

const audio = ref<HTMLAudioElement | null>(null);
const {
	isPlay,
	loadStorage,
	changePlayStatusButton,
	onTimeUpdate,
	musicInfoObj,
	getMusicInfoStorage,
	getMusicPlayStatusStorage,
} = useMusicPlayer(audio);

(function loadStorageMusicInfoAndStatus() {
	const data = getMusicInfoStorage();
	const playData = getMusicPlayStatusStorage();
	if (playData !== null && musicInfoObj.musicPlayStatus.musicCurrentTime !== 0) {
		musicInfoObj.musicPlayStatus.musicCurrentTime = playData.musicCurrentTime;
	}
	if (data !== null && musicInfoObj.musicInfo === null) {
		musicInfoObj.musicInfo = data;
	}
}());

const musicInfo = computed(() => {
	let musicShowInfo = {
		musicName: '歌曲名字',
		musicId: 0,
		musicPicUrl: '',
		musicAuthor: '作者',
	};
	if (musicInfoObj.musicInfo) {
		const {
			name, id, ar, al,
		} = musicInfoObj.musicInfo;
		const { picUrl } = al;
		const author = ar.map((item) => item.name).join('/');
		if (name && id && picUrl && author) {
			musicShowInfo = {
				musicName: name,
				musicId: id,
				musicPicUrl: picUrl,
				musicAuthor: author,
			};
		}
	}
	return musicShowInfo;
});
onMounted(() => {
	loadStorage();
});
</script>

<template>
	<div class="music_player">
		<audio ref="audio"
				@timeupdate="onTimeUpdate"></audio>
		<div class="music_profile">
			<div class="music_cover">
				<img src="../../assets/logo.png"
						class="music_cover"
						v-if="musicInfo.musicPicUrl === ''">
				<img :src="
				musicInfo.musicPicUrl"
						class="music_cover"
						v-else>

			</div>
			<div class="music_info">
				<div class="music_title">{{ musicInfo.musicName }}</div>
				<div class="music_singer">{{ musicInfo.musicAuthor }}</div>
			</div>
			<div class="music_addtion">
				<a class="addition_like">
					<img src="../../assets/like_default.png">
				</a>
			</div>
		</div>
		<!-- FIXME:播放按钮 的剩余按钮-->
		<div class="music_button">
			<div class="go_start">
				<img src="../../assets/go-start.png">
			</div>
			<div class="play"
					@click="changePlayStatusButton">
				<img src="../../assets/play.png"
						v-if="!isPlay">
				<img src="../../assets/pause.png"
						v-else>
			</div>
			<div class="go_end">
				<img src="../../assets/go-end.png">
			</div>
		</div>
		<!-- TODO:进度条 -->
		<div class="process_bar">
			<div class="outer_frame">
				<span class="current_time">0:00</span>
				<div class="process" />
				<span class="all_time">0:00</span>
			</div>
		</div>
		<div class="music_handler_menu">
			<!-- TODO:音量 -->
			<div class="music_list">
				<img src="../../assets/music-list.png">
			</div>
		</div>
	</div>
</template>
