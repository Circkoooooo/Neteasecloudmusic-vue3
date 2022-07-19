<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import '~/styles/page.less';
import SlideBar from '~/components/SlideBar/SlideBar.vue';
import MusicPlayer from '~/components/MusicPlayer/MusicPlayer.vue';
import UserProfile from '~/components/UserProfile/UserProfile.vue';
import PlayList from '~/components/PlayList/PlayList.vue';
import useUserStore from '~/store/userStore';
import getLoginStatus from '~/composables/login';
import saveUserLikeList from './composables/saveUserLikeList';

const router = useRouter();
const userStore = useUserStore();

const menuConfig = [
	{
		menuItem: [
			{
				link: '/',
				title: '发现音乐',
			},
		],
	},
	{
		menuTitle: '我的音乐',
		menuItem: [
			{
				link: '/localdownload',
				title: '本地与下载',
			},
			{
				link: '/recentplay',
				title: '最近播放',
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
		</div>
		<div class="main_fix">
			<keep-alive>
				<MusicPlayer key="musicpalyer"></MusicPlayer>
			</keep-alive>
			<PlayList></PlayList>
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
	}

	.main_fix {
		height: 80px;
		position: relative;
	}
}

.slidebar {
	min-width: 216px;
	height: 100%;
	background-color: white;
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
