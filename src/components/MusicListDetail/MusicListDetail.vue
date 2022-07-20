<script lang="ts" setup>
import './MusicListDetail.less';
import './MusicListDetailInfo.less';
import './MusicListDetailList.less';
import { computed } from 'vue';
import { DetailMusicPlayList } from '~/types/Music/DetailMusicPlayList';
import { MusicInfo } from '~/types/Music/MusicInfo';
import MusicItem from '~/components/MusicItem/MusicItem.vue';
import useMusicDetailStore from '~/store/musicDetailStore';

const musicDetailStore = useMusicDetailStore();
withDefaults(defineProps<{
	playList: DetailMusicPlayList
	songs: MusicInfo[]
}>(), {});

const isLoading = computed(() => {
	if (musicDetailStore.loadedListId !== 0 && musicDetailStore.loadingListId !== 0
		&& musicDetailStore.loadedListId === musicDetailStore.loadingListId) {
		return false;
	}
	return true;
});

</script>
<template>
	<div class="musiclist_detail">
		<div class="detail_inner">
			<!-- loading -->
			<div class="musiclistdetail_lodding"
					v-if="isLoading">
				<span class="loader"></span>
			</div>
			<!-- loaded -->
			<div class="musiclistdetail_info"
					v-else>
				<div class="list_cover">
					<img :src="playList.coverImgUrl">
				</div>
				<div class="list_info">
					<div class="list_title">{{ playList.name }}</div>
					<div class="list_description">{{ playList.description }}</div>
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
