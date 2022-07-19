<script lang="ts" setup>
import './MusicPlayer.less';
import {
	computed, onMounted, ref,
} from 'vue';
import useMusicPlayer from '~/composables/useMusicPlayer';
import timeFormat from '~/utils/timeFormat';
import useMusicPlayerStore from '~/store/musicPlayerStore';
import useUserLikeListStore from '~/store/userLikeListStore';
import usePlayListStore from '~/store/playListStore';

// FIXME:在无歌曲状态下，拖动滚动条，会导致音乐播放按钮变成播放状态。
const audio = ref<HTMLAudioElement | null>(null);
const headBtn = ref<HTMLElement | null>(null);
const processBar = ref<HTMLElement | null>(null);
const startX = ref(0);
const startProcess = ref(0);
const offsetX = ref(0);
const isMove = ref(false);
const musicPlayerStore = useMusicPlayerStore();
const userLikeListStore = useUserLikeListStore();
const playListStore = usePlayListStore();

const musicPlayer = useMusicPlayer(audio);
const {
	isPlay,
	loadStorage,
	changePlayStatusButton,
	onTimeUpdate,
	onEnded,
	musicInfoObj,
	getMusicInfoStorage,
	getMusicPlayStatusStorage,
	changeCurrentTime,
	nextMusic,
	like,
} = musicPlayer;

musicPlayerStore.nextMusic = nextMusic;
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
		musicAuthor: '歌手',
	};
	if (musicInfoObj.musicInfo) {
		const {
			name, id, ar, al,
		} = musicInfoObj.musicInfo;
		const { picUrl } = al;
		const author = ar.map((item) => item.name).join('/');
		if (name && id && author) {
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

const process = computed(() => {
	const { musicDuration, musicCurrentTime } = musicInfoObj.musicPlayStatus;
	if (!musicCurrentTime || !musicDuration) { return 0; }

	return Math.fround(musicCurrentTime / musicDuration) * 100 >= 100
		? 100 : Math.fround(musicCurrentTime / musicDuration) * 100;
});

const headBtnMove = (event: MouseEvent) => {
	const ofx = event.clientX - startX.value;
	offsetX.value = startProcess.value + ofx;
	if (offsetX.value > musicInfoObj.musicPlayStatus.musicDuration) {
		offsetX.value = musicInfoObj.musicPlayStatus.musicDuration;
	}
	musicInfoObj.musicPlayStatus.musicCurrentTime = offsetX.value;
};

const isLike = computed(() => userLikeListStore.likeList.includes(musicInfo.value.musicId));

const changePlayList = () => {
	playListStore.isShow = !playListStore.isShow;
};

onMounted(() => {
	loadStorage();
	headBtn.value!.onmousedown = (startEvent: MouseEvent) => {
		isMove.value = true;
		isPlay.value = false;
		startX.value = startEvent.clientX;
		startProcess.value = musicInfoObj.musicPlayStatus.musicCurrentTime;
		document.addEventListener('mousemove', headBtnMove, false);
		document.onmouseup = () => {
			document.removeEventListener('mousemove', headBtnMove, false);
			if (offsetX.value !== 0) {
				changeCurrentTime(offsetX.value);
			}
			if (isMove.value) {
				isPlay.value = true;
			}
			isMove.value = false;
			startX.value = 0;
			startProcess.value = 0;
			offsetX.value = 0;
		};
	};
});

</script>

<template>
	<div class="music_player">
		<audio ref="audio"
				@timeupdate="onTimeUpdate"
				@ended="onEnded"></audio>
		<div class="music_profile">
			<div class="music_cover">
				<img src="../../assets/logo.png"
						class="music_cover"
						v-if="!musicInfo.musicPicUrl">
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
				<!-- like -->
				<a class="addition_like"
						@click="like(isLike)">
					<img src="../../assets/like.png"
							v-if="isLike">
					<img src="../../assets/like_default.png"
							v-else>
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
			<span class="current_time">
				{{ timeFormat(musicInfoObj.musicPlayStatus.musicCurrentTime) }}</span>
			<div class="outer_frame">
				<div class="inner_bar"
						:style="{ width: process + '%' }">
					<div class="head_btn"
							ref="headBtn" />
				</div>
				<div class="process"
						ref="processBar" />
			</div>
			<span class="all_time">
				{{ timeFormat(musicInfoObj.musicPlayStatus.musicDuration) }}
			</span>
		</div>
		<div class="music_handler_menu">
			<div class="music_list"
					@click="changePlayList">
				<img src="../../assets/music-list.png"
						id="music-list-btn">
			</div>
		</div>
	</div>
</template>
