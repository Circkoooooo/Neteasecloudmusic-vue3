import { defineStore } from 'pinia';

const useLoginStore = defineStore('loginstore', ({
	state: ():{
		status: 'close' | 'load' | 'wait' | 'waitPermit' | 'success' | 'expired',
		key: string | null,
		qrurl: string | null,
	} => ({
		status: 'close',
		key: null,
		qrurl: null,
	}),
}));
export default useLoginStore;
