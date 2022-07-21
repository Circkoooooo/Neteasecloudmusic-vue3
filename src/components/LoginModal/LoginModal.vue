<script lang="ts" setup>
import './LoginModal.less';

import QRCode from 'qrcode';
import { onMounted, ref } from 'vue';

const canvas = ref();
onMounted(() => {
	QRCode.toCanvas(canvas.value, 'https://music.163.com/login?codekey=97896bec-77cb-43cb-87f0-6156587cc95c', (err) => {
		if (err) throw err;
	});
});
</script>

<template>
	<div class="overlay">
		<div class="login_overlay">
			<div class="login_modal">
				<canvas ref="canvas"></canvas>
			</div>
		</div>
	</div>
</template>
