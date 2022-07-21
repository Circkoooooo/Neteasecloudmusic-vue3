<script lang="ts" setup>
import './UserProfile.less';
import { computed } from 'vue';
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
	<div class="user_profile"
			@click="openModal">
		<div class="avatar">
			<img :src="userProfile?.avatarUrl"
					v-if="userProfile?.avatarUrl">
			<img src="../../assets/logo.png"
					v-else>
		</div>
		<div class="profile_logout"
				v-if="user.account === null && user.profile === null">
			点击登录
		</div>
		<div class="nickname">
			{{ userProfile?.nickname }}
		</div>
	</div>
</template>
