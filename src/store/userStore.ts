import { defineStore } from 'pinia';
import { Account, Profile } from '~/types/User/UserProfile';

const useUserStore = defineStore('userStore', {
	state: (): {
		profile: Profile | null
		account:Account | null
	} => ({
		profile: null,
		account: null,
	}),
});
export default useUserStore;
