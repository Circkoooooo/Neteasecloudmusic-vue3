<script lang="ts" setup>
import './UserProfile.less';
import { computed } from 'vue';
import userStore from '~/store/UserStore';

const user = userStore();
const userProfile = computed(() => user.profile);

</script>

<template>
	<div class="user_profile">
		<div class="avatar">
			<img :src="userProfile?.avatarUrl"
					v-if="userProfile?.avatarUrl">
			<img src="../../assets/logo.png"
					v-else>
		</div>
		<div class="nickname">
			{{ userProfile?.nickname }}
		</div>
	</div>
</template>
