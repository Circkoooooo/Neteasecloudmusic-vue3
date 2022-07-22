<script lang="ts" setup>
import './MusicListDetail.less';
import './MusicListDetailInfo.less';
import './MusicListDetailList.less';
import { computed } from 'vue';
import { DetailMusicPlayList } from '~/types/Music/DetailMusicPlayList';
import { MusicInfo } from '~/types/Music/MusicInfo';
import MusicItem from '~/components/MusicItem/MusicItem.vue';
import createTimeFormat from '~/utils/createTimeFormat';
import useMusicDetailStore from '~/store/musicDetailStore';
import useMusicPlayerStore from '~/store/musicPlayerStore';

const { replaceMusicList } = useMusicPlayerStore();
const musicDetailStore = useMusicDetailStore();
const props = withDefaults(defineProps<{
	playList?: DetailMusicPlayList;
	songs: MusicInfo[];
	isLoading: boolean;
}>(), {});

const userDetail = computed(() => musicDetailStore.userDetail);
const like = computed(() => musicDetailStore.isLikeList);
const comSongs = computed(() => props.songs);
</script>
<template>
	<div class="musiclist_detail">
		<div class="musiclistdetail_lodding"
				v-if="isLoading">
			<span class="loader"></span>
		</div>
		<div class="detail_inner"
				v-else>
			<!-- info -->
			<div class="musiclistdetail_info">
				<div class="list_cover">
					<img :src="playList?.coverImgUrl">
				</div>
				<div class="list_info">
					<div class="list_title">{{ playList?.name }}</div>
					<div class="list_addition">
						<div class="addition_create">
							<!-- creator -->
							<div class="creator">
								<div class="creator_avatar">
									<img :src="userDetail.profile.avatarUrl"
											v-if="userDetail.profile">
								</div>
								<div class="creator_nickname">
									{{ userDetail.profile.nickname }}
								</div>
								<div class="create_time">{{ !playList?.createTime ? '' :
										createTimeFormat(playList.createTime)
								}}创建</div>
							</div>
						</div>
						<div class="addition_btn">
							<div class="playall"
									@click="replaceMusicList(songs)">播放全部</div>
						</div>
					</div>
					<div class="musiclist_data">
						<div class="track_count">歌曲：{{ playList?.trackCount }}</div>
						<div class="play_count">播放量：{{ playList?.playCount }}</div>
					</div>
					<div class="list_description"
							v-if="!like">简介：{{ playList?.description }}</div>
				</div>
			</div>
			<!-- music -->
			<div class="musiclistdetail_list">
				<div v-for="(song, key) in comSongs"
						:key="song.id">
					<MusicItem :musicInfo="song"
							:index="key + 1"
							namespace='listdetailMusicItem'></MusicItem>
				</div>
			</div>
		</div>
	</div>
</template>
