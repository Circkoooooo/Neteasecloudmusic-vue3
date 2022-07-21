<script lang="ts" setup>
import axios from 'axios';
import postUrl from '~/axios/postUrl';

const logout = () => {
	axios.post(postUrl.logOut).then((res) => {
		if (res.data.code === 200) {
			window.location.reload();
		}
	});
};

const items = [
	{
		title: '退出',
		clickFn: logout,
	},
];
</script>
<template>
	<div class="user_modal">
		<div class="modal_item"
				v-for="(item, index) in items"
				:key="index">
			<div class="modal_title"
					@click="item.clickFn">{{ item.title }}</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.user_modal {
	.modal_item {
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: bold;
		width: 100%;
		height: 24px;
		border-radius: 4px;
		cursor: pointer;

		&:hover {
			background-color: rgba(0, 0, 0, 0.03);
		}
	}
}
</style>
