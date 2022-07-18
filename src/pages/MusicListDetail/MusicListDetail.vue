<script lang="ts" setup>
import './MusicListDetail.less';
import { computed } from 'vue';
import useMusicDetailStore from '~/store/musicDetailStore';
import MusicListDetailList from '~/components/MusicListDetailList/MusicListDetailList.vue';
import MusicListDetailListInfo from '~/components/MusicListDetailInfo/MusicListDetailListInfo.vue';

const musicDetailStore = useMusicDetailStore();
const songs = computed(() => {
	if (musicDetailStore.loadedListId !== musicDetailStore.loadingListId) {
		return [];
	}
	return musicDetailStore.songs;
});

</script>

<template>
	<div class="musiclist_detail">
		<!-- loading -->
		<div class="detail_inner">
			<MusicListDetailListInfo :playList="musicDetailStore.playlist"></MusicListDetailListInfo>
			<MusicListDetailList :songs="songs"> </MusicListDetailList>
		</div>
	</div>
</template>
