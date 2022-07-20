<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { computed, onMounted, watch } from 'vue';
import '~/styles/page.less';
import '~/styles/animate.less';
import SlideBar from '~/components/SlideBar/SlideBar.vue';
import MusicPlayer from '~/components/MusicPlayer/MusicPlayer.vue';
import UserProfile from '~/components/UserProfile/UserProfile.vue';
import PlayList from '~/components/PlayList/PlayList.vue';
import useUserStore from '~/store/userStore';
import getLoginStatus from '~/composables/login';
import saveUserLikeList from './composables/saveUserLikeList';
import routerNamespace from './router/routerNamespace';
import MenuConfigType from './types/Menu/MenuConfigType';
import useUserLikeListStore from './store/userLikeListStore';
import userLikeList from './composables/userLikeList';

const router = useRouter();
const userStore = useUserStore();
const userLikeListStore = useUserLikeListStore();

const menuConfig: MenuConfigType[] = [
	{
		menuItem: [
			{
				link: routerNamespace.Home.path,
				title: '发现音乐',
			},
		],
	},
	// {
	// 	menuTitle: '我的音乐',
	// 	menuItem: [
	// 		{
	// 			link: '/localdownload',
	// 			title: '本地与下载',
	// 		},
	// 		{
	// 			link: '/recentplay',
	// 			title: '最近播放',
	// 		},
	// 	],
	// },
	{
		menuTitle: '创建的歌单',
		menuItem: [
			{
				link: routerNamespace.LikeMusic.path,
				title: '我喜欢的音乐',
				show: computed(() => userStore.profile !== null && userStore.account !== null),
			},
		],
	},
];

// get userLikeListStore+
(function preload() {
	// getLoginStatus if login, set profile and account info to pinia.
	getLoginStatus().then((res) => {
		if (res !== null) {
			userStore.account = res.account;
			userStore.profile = res.profile;
			saveUserLikeList(res.account.id);
		}
	});
}());

onMounted(() => {
	router.push('/');
});

watch(userStore, () => {
	if (userStore.account !== null && userStore.profile !== null) {
		userLikeList(userStore.account.id);
	}
});
watch(userLikeListStore, () => {
	if (userLikeListStore.likeListMusicList.length !== 0) {
		userLikeListStore.isLoading = false;
	}
});
</script>

<template>
	<div class="main">
		<div class="main_content">
			<SlideBar :menuConfig="menuConfig">
				<template v-slot:UserProfile>
					<UserProfile></UserProfile>
				</template>
			</SlideBar>
			<div class="content">
				<router-view></router-view>
			</div>
			<PlayList></PlayList>
		</div>
		<div class="main_fix">
			<keep-alive>
				<component name="musicplayer"
						:is="MusicPlayer"></component>
			</keep-alive>
		</div>
	</div>
</template>

<style lang="less" scoped>
.main {
	background-color: rgba(@main-color-RGB, 0.05);
	height: 100%;
	display: flex;
	flex-direction: column;

	.main_content {
		display: flex;
		height: 100%;
		overflow: hidden;
		position: relative;
	}

	.main_fix {
		height: 80px;
	}
}

.content {
	flex: 1;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		width: 4px;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 8px;
		background: rgba(0, 0, 0, 0.3);
	}

}
</style>
