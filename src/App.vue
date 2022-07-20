<script lang="ts" setup>
import { useRouter } from 'vue-router';
import {
	onMounted, watch,
} from 'vue';
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
import useUserLikeListStore from './store/userLikeListStore';
import userLikeList from './composables/userLikeList';
import userPlayList from './composables/userPlayList';
import useUserPlayListStore from './store/userPlayListStore';
import useSlideBarStore from './store/slideBarStore';
import { MenuConfigItemType } from './types/Menu/MenuConfigType';

const router = useRouter();
const userStore = useUserStore();
const userLikeListStore = useUserLikeListStore();
const userPlayListStore = useUserPlayListStore();
const slideBarStore = useSlideBarStore();

// const menuConfigRef = computed<MenuConfigType[]>(() => menuConfig);

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
		userPlayList(userStore.account.id);
	}
});
watch(userLikeListStore, () => {
	if (userLikeListStore.likeListMusicList.length !== 0) {
		userLikeListStore.isLoading = false;
	}
});

watch(userPlayListStore, () => {
	const subscribeList = userPlayListStore.userPlayList.filter((list) => list.subscribed);
	const notsubscribeList = userPlayListStore.userPlayList.filter((list) => !list.subscribed);
	const notsubInfos = notsubscribeList.map((item) => ({
		id: item.id,
		name: item.name,
	}));
	const subInfos = subscribeList.map((item) => ({
		id: item.id,
		name: item.name,
	}));

	const notSubscribeConfig: MenuConfigItemType[] = notsubInfos.map((info) => ({
		itemType: 'musiclist',
		link: routerNamespace.ListDetail.path,
		title: info.name,
		musicListId: info.id,
	} as MenuConfigItemType));

	const subscribedConfig: MenuConfigItemType[] = subInfos.map((info) => ({
		itemType: 'musiclist',
		link: routerNamespace.ListDetail.path,
		title: info.name,
		musicListId: info.id,
	} as MenuConfigItemType));

	const notSubMusicIndex = slideBarStore.menuConfig.findIndex((config) => config.menuType === 'createMusic');
	const subMusicIndex = slideBarStore.menuConfig.findIndex((config) => config.menuType === 'favoriteList');
	slideBarStore.menuConfig[notSubMusicIndex].menuItem.push(...notSubscribeConfig);
	slideBarStore.menuConfig[subMusicIndex].menuItem.push(...subscribedConfig);
	if (slideBarStore.menuConfig[notSubMusicIndex].menuItem[0].title.lastIndexOf('喜欢的音乐') !== -1) {
		slideBarStore.menuConfig[notSubMusicIndex].menuItem[0].title = '我喜欢的音乐';
	}
});
</script>

<template>
	<div class="main">
		<div class="main_content">
			<SlideBar>
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
	position: relative;
}

* {
	&::-webkit-scrollbar {
		width: 4px;
		opacity: 0;
	}

	&::-webkit-scrollbar-thumb {
		opacity: 0;
	}

	&:hover {
		&::-webkit-scrollbar {
			width: 4px;
			opacity: 1;
		}

		&::-webkit-scrollbar-thumb {
			border-radius: 8px;
			background: rgba(0, 0, 0, 0.3);
		}
	}
}
</style>
