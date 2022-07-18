import { defineStore } from 'pinia';
import { MusicPlayerType } from '~/types/Music/MusicPlayer';

const useMusicPlayerStore = defineStore('musicPlayerStore', {
	state: (): MusicPlayerType => ({} as MusicPlayerType),
});

export default useMusicPlayerStore;
