import { DetailMusicSubscriber } from '../Music/DetailMusicSubscriber';

export type MenuConfigItemType = {
	itemType:'musiclist'|'showpage',
	link: string,
	iconPath?: string,
	title: string,
	show?:boolean,
	creator?: DetailMusicSubscriber,
	musicListName?: string,
	musicListId?:number,
}

export type MenuConfigType = {
	menuType:'findMusic'|'createMusic'|'favoriteList'
	menuTitle?: string,
	menuItem:MenuConfigItemType[],
}
