import { Ref } from 'vue';

const useMusicPlayer = (musicSource: Ref<HTMLAudioElement|null>) => {
	const loadMusic = (musicSourceUrl: string) => {
		if (musicSource.value === null) return;
		musicSource.value.src = musicSourceUrl;
		musicSource.value.play();
	};
	const play = () => {
		if (musicSource.value === null) return;
		musicSource.value.play();
	};
	const pause = () => {
		if (musicSource.value === null) return;
		musicSource.value.pause();
	};

	const getMusicById = (musicId:number) => {
		console.log(musicId);
	};
	return {
		loadMusic,
		play,
		pause,
		getMusicById,
	};
};

export default useMusicPlayer;
