<script lang="ts" setup>
import '~/styles/page.less';
import SlideBar from '~/components/SlideBar/SlideBar.vue';
import MusicPlayer from '~/components/MusicPlayer/MusicPlayer.vue';
import UserProfile from '~/components/UserProfile/UserProfile.vue';
import useUserStore from '~/store/UserStore';
import getLoginStatus from '~/composables/login';

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
// getLoginStatus if login, set profile and account info to pinia.
getLoginStatus().then((res) => {
	if (res !== null) {
		userStore.account = res.account;
		userStore.profile = res.profile;
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
		</div>
		<div class="main_fix">
			<MusicPlayer></MusicPlayer>
		</div>
	</div>
</template>

<style lang="less" scoped>
.main {
	height: 100%;
	display: flex;
	flex-direction: column;

	.main_content {
		display: flex;
		height: 100%;
	}

	.main_fix {
		height: 80px;
		position: relative;
	}
}

.slidebar {
	min-width: 216px;
	height: 100%;
	background-color: @layoutback-color;
}

.content {
	flex: 1;
	overflow: hidden;
}
</style>
