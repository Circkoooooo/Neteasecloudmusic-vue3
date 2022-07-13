<script lang="ts" setup>
import '~/styles/page.less';
</script>

<template>
	<div id="main">
		<div class="slidebar">
			<div>侧边栏</div>
		</div>
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
