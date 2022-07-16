<script lang="ts" setup>
import './MusicPlayer.less';
// import { onMounted, ref } from 'vue';
// import useMusicPlayer from '~/composables/useMusicPlayer';

// const audio = ref<HTMLAudioElement | null>(null);
// const { loadMusic } = useMusicPlayer(audio);
// onMounted(() => {
// 	loadMusic('http://m8.music.126.net/20220716174252/c29223c2f308b8fbccdc39b3e62b580a/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3');
// });
</script>

<template>
	<div class="music_player">
		<audio ref="audio"></audio>
		<div class="music_profile">
			<div class="music_cover">
				<img src="../../assets/logo.png"
						class="music_cover">
			</div>
			<div class="music_info">
				<div class="music_title">歌曲标题</div>
				<div class="music_singer">歌手信息</div>
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
			<div class="play">
				<img src="../../assets/play.png">
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
