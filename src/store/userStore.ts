import { defineStore } from 'pinia';
import { Account, Profile } from '~/types/User/UserProfile';

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
const UseStore = defineStore('user', {
	state: (): {
		profile: Profile | null
		account:Account | null
	} => ({
		profile: null,
		account: null,
	}),
});
export default UseStore;
