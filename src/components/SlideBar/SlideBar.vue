<script lang="ts" setup>
import './SlideBar.less';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';

const route = useRoute();
const router = useRouter();
const currentIndex = ref<Array<number>>([0, 0]);

interface MenuConfigType {
	menuTitle?: string,
	menuItem: {
		link: string,
		iconPath?: string,
		title: string,
	}[]
}
const props = withDefaults(defineProps<{ menuConfig: MenuConfigType[] }>(), {});

const linkTo = (link: string) => {
	router.push(link);
};

/**
 *
 * require a path to calculate two index like [1,2],
 * the first one is the index of the menu
 * and the second one is the
 * index of menuItem in menu.
 * @param newPath
 */
const getPathIndexTree = (newPath: string): number[] => {
	const config = props.menuConfig;
	const target = config.map((item, index) => {
		const childIndex = item.menuItem.findIndex((child) => child.link === newPath);
		if (childIndex !== -1) {
			return [index, childIndex];
		}
		return -1;
	});
	if (target.every((item) => item === -1)) {
		return [-1, -1];
	}
	const pathIndexList = target.find((item) => item !== -1);
	if (pathIndexList === undefined || pathIndexList === -1) {
		return [0, 0];
	}
	return pathIndexList;
};

/**
 * watch route's change.
 */
watch(
	() => route.path,
	async (newPath) => {
		const pathIndexList = getPathIndexTree(newPath);
		currentIndex.value = pathIndexList;
	},
);
</script>

<template>
	<div class="slidebar">
		<!-- TODO:add user info card to it. -->
		<slot name="UserProfile"></slot>
		<!-- Menu -->
		<div class="menu">
			<div class="submenu"
					v-for="(item, index) in menuConfig"
					:key="index">
				<div class="item title"
						v-if="item.menuTitle">{{ item.menuTitle }}
				</div>
				<div class="item menuItem"
						:class="{ select: index === currentIndex[0] && childIndex === currentIndex[1] }"
						v-for="(child, childIndex) in item.menuItem"
						:key="childIndex"
						@click="linkTo(child.link)">
					{{ child.title }}
				</div>
			</div>
		</div>
	</div>
</template>
