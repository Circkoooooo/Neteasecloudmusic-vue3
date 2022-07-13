<script lang="ts" setup>
import './SlideBar.less';

// TODO: 增加select匹配路由的配置
interface MenuConfigType {
	menuTitle?: string,
	menuItem: {
		iconPath?: string,
		title: string,
	}[]
}
withDefaults(defineProps<{ menuConfig: MenuConfigType[] }>(), {});
</script>

<template>
	<div class="slidebar">
		<!-- TODO:add user info card to it. -->
		<slot name="UserInfoSummary"></slot>
		<!-- Menu -->
		<div class="menu">
			<div class="submenu"
					v-for="(item, index) in menuConfig"
					:key="index">
				<div class="item title"
						v-if="item.menuTitle">{{ item.menuTitle }}</div>
				<div class="item menuItem"
						v-for="(child, index) in item.menuItem"
						:key="index">{{ child.title }}</div>
			</div>
		</div>
	</div>
</template>
