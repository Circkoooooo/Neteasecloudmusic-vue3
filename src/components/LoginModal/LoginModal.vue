<script lang="ts" setup>
import './LoginModal.less';
import { onMounted, ref, watch } from 'vue';
import QRCode from 'qrcode';
import getLoginStatus, { checkQrCode, getQrCode, getQrCodeKey } from '~/composables/login';
import useLoginStore from '~/store/loginStore';

const loginStore = useLoginStore();
const canvas = ref(null);

let timer: any = null;

const qrcode = () => {
	if (loginStore.qrurl === null) return;
	QRCode.toCanvas(canvas.value, loginStore.qrurl, {
		width: 128,
	});
};

const checkCode = async () => {
	if (loginStore.status === 'close') {
		if (timer !== null) {
			clearInterval(timer);
		}
	}
	if (loginStore.status === 'close' || loginStore.key === null) return;
	const status = await checkQrCode(loginStore.key);
	if (status.code === 800) loginStore.status = 'expired';
	if (status.code === 801) loginStore.status = 'wait';
	if (status.code === 802) loginStore.status = 'waitPermit';
	if (status.code === 803) loginStore.status = 'success';
};

const updateCode = async () => {
	const key = await getQrCodeKey();
	if (key === null) return;
	loginStore.key = key;
	loginStore.status = 'wait';
	getQrCode(key).then((res) => {
		if (res !== null) {
			loginStore.qrurl = res;
			qrcode();
		}
	});
	timer = setInterval(() => {
		checkCode();
	}, 2000, false);
};

watch(loginStore, async () => {
	if (loginStore.status === 'load') {
		updateCode();
	}
	if (loginStore.status === 'wait') {
		qrcode();
	}

	if (loginStore.status === 'expired') {
		updateCode();
	}
	if (loginStore.status === 'success') {
		getLoginStatus().then((res) => {
			if (res?.account !== null && res?.profile !== null) {
				window.location.reload();
				loginStore.status = 'close';
			}
		});
	}
});

const closeModal = () => {
	loginStore.status = 'close';
};

onMounted(() => {
	if (canvas.value === null) return;
	QRCode.toCanvas(canvas.value, '还没有准备好，别急着扫码', {
		width: 128,
	});
});
</script>

<template>
	<div class="overlay"
			v-if="loginStore.status !== 'close'">
		<div class="login_overlay">
			<div class="login_modal">
				<div class="modal_title">二维码登录</div>
				<canvas ref="canvas"></canvas>
				<div class="modal_btn">
					<div class="modal_btn_exit"
							@click="closeModal">关闭</div>
				</div>
			</div>
		</div>
	</div>
</template>
