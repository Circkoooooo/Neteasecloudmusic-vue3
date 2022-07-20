<script lang="ts" setup>
import './MusicListDetail.less';
import './MusicListDetailInfo.less';
import './MusicListDetailList.less';
import { DetailMusicPlayList } from '~/types/Music/DetailMusicPlayList';
import { MusicInfo } from '~/types/Music/MusicInfo';
import MusicItem from '~/components/MusicItem/MusicItem.vue';

withDefaults(defineProps<{
	playList?: DetailMusicPlayList;
	songs: MusicInfo[];
	isLoading: boolean;
}>(), {});
</script>
<template>
	<div class="musiclist_detail">
		<div class="musiclistdetail_lodding"
				v-if="isLoading">
			<span class="loader"></span>
		</div>
		<div class="detail_inner"
				v-else>
			<!-- loading -->
			<!-- loaded -->
			<div class="musiclistdetail_info">
				<div class="list_cover">
					<img :src="playList?.coverImgUrl">
				</div>
				<div class="list_info">
					<div class="list_title">{{ playList?.name }}</div>
					<div class="list_description">{{ playList?.description }}</div>
				</div>
			</div>
			<div class="musiclistdetail_list">
				<div v-for="(song, key) in songs"
						:key="song.id">
					<MusicItem :musicInfo="song"
							:index="key + 1"></MusicItem>
				</div>
			</div>
		</div>
	</div>
</template>
