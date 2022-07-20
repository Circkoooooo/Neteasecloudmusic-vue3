<script lang="ts" setup>
import { useRouter } from 'vue-router';
import './RecommendMusicList.less';
import { onMounted, ref } from 'vue';
import MusicListDetail from '~/composables/musicListDetail';
import { RecommendMusicList } from '~/types/Music/RecommendMusicList';
import routerNamespace from '~/router/routerNamespace';

const router = useRouter();
const rcmdList = ref<HTMLElement>();

withDefaults(defineProps<{
	recommendList: RecommendMusicList[] | null;
}>(), {});

onMounted(() => {
	if (rcmdList.value !== undefined && rcmdList.value !== null) {
		rcmdList.value.onwheel = (event) => {
			event.preventDefault();
			if (event.deltaY !== 0) {
				rcmdList.value!.scrollLeft += event.deltaY;
			} else {
				rcmdList.value!.scrollLeft += event.deltaX;
			}
		};
	}
});

</script>

<template>
	<div class="recommend_music_list"
			ref="rcmdList">
		<div class="rcmd_music"
				v-for="rcmdMusic in recommendList"
				:key="rcmdMusic.id"
				@click="MusicListDetail(rcmdMusic.id, router, routerNamespace.ListDetail.path)">
			<div class="img">
				<img :src="rcmdMusic.picUrl">
			</div>
			<div class="music_info">
				<div class="title">
					{{ rcmdMusic.name }}
				</div>
			</div>
		</div>
	</div>
</template>
