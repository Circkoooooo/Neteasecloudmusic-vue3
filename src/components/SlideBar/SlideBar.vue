<script lang="ts" setup>
import './SlideBar.less';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import useSlideBarStore from '~/store/slideBarStore';
import musicListDetail from '~/composables/musicListDetail';

const router = useRouter();
const slideBarStore = useSlideBarStore();
const currentIndex = ref<Array<number>>([0, 0]);
const menuConfig = computed(() => slideBarStore.menuConfig);

const linkTo = (link: string, itemIndex: number, childIndex: number) => {
	const clickItem = slideBarStore.menuConfig[itemIndex].menuItem[childIndex];
	if (clickItem.itemType === 'showpage') {
		router.push(link);
	}
	if (clickItem.itemType === 'musiclist') {
		router.push(link);
		if (clickItem.musicListId === undefined) return;
		musicListDetail(clickItem.musicListId, router, clickItem.link);
	}
	currentIndex.value = [itemIndex, childIndex];
};

</script>

<template>
	<div class="slidebar">
		<slot name="UserProfile"></slot>
		<!-- Menu -->
		<div class="menu">
			<div class="submenu"
					v-for="(item, itemIndex) in menuConfig"
					:key="itemIndex">
				<template v-if="item.menuItem.some(
					(config => config.show === undefined || config.show)
				)">
					<div class="item title"
							v-if="item.menuTitle">{{ item.menuTitle }}
					</div>
					<div class="item menuItem"
							:class="{ select: itemIndex === currentIndex[0] && childIndex === currentIndex[1] }"
							v-for="(child, childIndex) in item.menuItem"
							v-show="child.show === undefined || child.show"
							:key="childIndex"
							@click="linkTo(child.link, itemIndex, childIndex)">
						{{ child.title }}
					</div>
				</template>
			</div>
		</div>
	</div>
</template>
