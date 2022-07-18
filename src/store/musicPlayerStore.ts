import { defineStore } from 'pinia';
import { MuiscPlayerType } from '~/types/Music/MusicPlayer';

const useMusicPlayerStore = defineStore('music-player', {
	state: (): MuiscPlayerType => ({} as MuiscPlayerType),
});

export default useMusicPlayerStore;
