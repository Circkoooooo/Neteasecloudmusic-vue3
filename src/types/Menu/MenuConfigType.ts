import { ComputedRef } from 'vue';

type MenuConfigType = {
	menuTitle?: string,
	menuItem: {
		link: string,
		iconPath?: string,
		title: string,
		show?: ComputedRef<boolean>
	}[]
}

export default MenuConfigType;
