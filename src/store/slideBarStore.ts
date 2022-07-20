import { defineStore } from 'pinia';
import routerNamespace from '~/router/routerNamespace';
import { MenuConfigType } from '~/types/Menu/MenuConfigType';

const useSlideBarStore = defineStore('slideBarStore', {
	state: (): {
		menuConfig : MenuConfigType[]
	} => ({
		menuConfig: [
			{
				menuType: 'findMusic',
				menuItem: [
					{
						itemType: 'showpage',
						link: routerNamespace.Home.path,
						title: '发现音乐',
					},
				],
			},
			{
				menuType: 'createMusic',
				menuTitle: '创建的歌单',
				menuItem: [
				],
			},
			{
				menuType: 'favoriteList',
				menuTitle: '收藏的歌单',
				menuItem: [
				],
			},
		],
	}),
});

export default useSlideBarStore;
