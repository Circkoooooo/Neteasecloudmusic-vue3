import { defineStore } from 'pinia';
import { MusicPlayerType } from '~/types/Music/MusicPlayer';

// if need some attributes of MusicPlayer, goto MusicPlayer component
// to find a block about assigning attribute, add more attributes.
const useMusicPlayerStore = defineStore('musicPlayerStore', {
	state: (): MusicPlayerType => ({} as MusicPlayerType),
});

export default useMusicPlayerStore;
