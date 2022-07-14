<script lang="ts" setup>
import '~/styles/page.less';
import SlideBar from '~/components/SlideBar/SlideBar.vue';

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
</script>

<template>
	<div id="main">
		<SlideBar :menuConfig="menuConfig"></SlideBar>
		<div class="content">
			<router-view></router-view>
		</div>
	</div>
</template>

<style lang="less" scoped>
#main {
	height: 100%;
	display: flex;
	flex-direction: row;
}

.slidebar {
	width: 216px;
	height: 100%;
	background-color: @layoutback-color;
}

.content {
	flex: 1;
}
</style>
