<script lang="ts" setup>
import './UserProfile.less';
import { computed } from 'vue';
import { ElPopover } from 'element-plus';
import UserModal from './UserModal.vue';
import userStore from '~/store/UserStore';
import useLoginStore from '~/store/loginStore';

const user = userStore();
const userProfile = computed(() => user.profile);
const loginStore = useLoginStore();

const openModal = () => {
	if (user.account === null && user.profile === null) {
		loginStore.status = 'load';
	}
};
</script>

<template>
	<div class="user_logout"
			@click="openModal"
			v-if="user.account === null && user.profile === null">
		<div class="avatar">
			<img src="../../assets/logo.png">
		</div>
		<div class="nickname"> 点击登录</div>
	</div>
	<!-- login -->
	<el-popover trigger="click"
			v-else>
		<template #reference>
			<div class="user_login">
				<div class="avatar">
					<img :src="userProfile?.avatarUrl">
				</div>
				<div class="nickname">
					{{ userProfile?.nickname }}
				</div>
			</div>
		</template>
		<template #default>
			<UserModal></UserModal>
		</template>
	</el-popover>
</template>
