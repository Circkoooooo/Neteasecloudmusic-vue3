import axios from 'axios';
import {
	reactive,
	Ref, ref, watch,
} from 'vue';
import postUrl from '~/axios/postUrl';
import { MusicInfo } from '~/types/Music/MusicInfo';

const storageNamespace = {
	musicInfo: 'currentMusicInfo',
	musicPlayStatus: 'musicPlayStatus',
	musicId: 'musicId',
};

const useMusicPlayer = (musicSource: Ref<HTMLAudioElement | null>) => {
	const musicInfoObj = reactive<{
		musicUrl:string,
		musicId: number,
		musicInfo: MusicInfo | null
		musicPlayStatus: {
			musicDuration: number,
			musicCurrentTime:number
		},
	}>({
		musicUrl: '',
		musicId: 0,
		musicInfo: null,
		musicPlayStatus: {
			musicCurrentTime: 0,
			musicDuration: 0,
		},
	});
	const isPlay = ref(false);

	// watch play status
	watch(isPlay, (newVal) => {
		if (newVal) {
			musicSource.value?.play();
		} else {
			musicSource.value?.pause();
		}
	});

	// save musicInfo like name, picture.
	const saveMusicInfoStorage = () => {
		window.localStorage.setItem(storageNamespace.musicInfo, JSON.stringify(musicInfoObj.musicInfo));
	};

	// get musicInfo.
	const getMusicInfoStorage = () => {
		const data = window.localStorage.getItem(storageNamespace.musicInfo);
		try {
			if (data !== null) {
				return JSON.parse(data);
			}
		} catch (err) {
			return null;
		}
		return null;
	};

	const getMusicPlayStatusStorage = () => {
		const data = window.localStorage.getItem(storageNamespace.musicPlayStatus);
		try {
			if (data !== null) {
				return JSON.parse(data);
			}
		} catch (err) {
			return null;
		}
		return null;
	};

	const saveMusicPlayStatusStorage = () => {
		const currentTime = musicSource.value?.currentTime;
		if (!currentTime) {
			musicInfoObj.musicPlayStatus.musicDuration = 0;
		}
		window.localStorage.setItem(
			storageNamespace.musicPlayStatus,
			JSON.stringify(musicInfoObj.musicPlayStatus),
		);
	};

	const getMusicIdStorage = () => {
		const musicId = window.localStorage.getItem(storageNamespace.musicId);
		if (musicId !== null) {
			return parseInt(musicId, 10);
		}
		return 0;
	};

	const saveMusicIdStorage = () => {
		window.localStorage.setItem(
			storageNamespace.musicId,
			JSON.stringify(musicInfoObj.musicId),
		);
	};

	// be excuted after loadmusic
	const play = (currentTime:number, playNow:boolean) => {
		if (musicSource.value === null) return;
		musicSource.value.src = musicInfoObj.musicUrl;
		musicSource.value.currentTime = currentTime;
		musicSource.value.oncanplay = () => {
			if (playNow) {
				isPlay.value = true;
			}
		};
	};

	// const onPause = () => {
	// 	isPlay.value = false;
	// };
	// use to ontimeupdate event
	const onTimeUpdate = () => {
		const duration = musicSource.value?.duration;
		const currentTime = musicSource.value?.currentTime;
		if (duration !== undefined && currentTime !== undefined) {
			musicInfoObj.musicPlayStatus.musicDuration = duration;
			musicInfoObj.musicPlayStatus.musicCurrentTime = currentTime;
			saveMusicPlayStatusStorage();
		}
	};

	const loadMusic = async (musicId: number, playNow:boolean, currentTime:number = 0) => {
		// storageMusicPlayStatus
		if (musicSource.value === null) return;

		const url = await axios.post(postUrl.getMusicUrlById, {
			id: musicId,
		}).then((res) => res.data.data[0].url);

		const musicInfoTemp = await axios.post(postUrl.getMusicInfoByIds, null, {
			params: {
				ids: musicId,
			},
		}).then((res) => res.data.songs[0]);

		musicInfoObj.musicUrl = url;
		musicInfoObj.musicInfo = musicInfoTemp;
		musicInfoObj.musicId = musicId;
		musicInfoObj.musicPlayStatus.musicCurrentTime = currentTime;
		// saveStorage
		saveMusicInfoStorage();
		saveMusicPlayStatusStorage();
		saveMusicIdStorage();
		play(currentTime, false);
	};

	const loadStorage = () => {
		const playStatus = getMusicPlayStatusStorage();
		if (playStatus !== null) {
			musicInfoObj.musicPlayStatus = playStatus;
		}
		const musicId = getMusicIdStorage();
		if (musicId !== null && musicId !== 0 && musicId !== undefined) {
			musicInfoObj.musicId = musicId;
			loadMusic(musicId, false, musicInfoObj.musicPlayStatus.musicCurrentTime);
		} else {
			const data = getMusicInfoStorage();
			const { id } = data;
			loadMusic(id, true);
		}
	};

	const changePlayStatusButton = () => {
		if (musicSource.value === null || !musicSource.value.src) return;
		isPlay.value = !isPlay.value;
		// save currentTime every click
		saveMusicPlayStatusStorage();
	};

	const changeCurrentTime = (currentTime?:number) => {
		if (currentTime === undefined) return;
		musicSource.value!.currentTime = currentTime;
	};

	const onEnded = () => {
		isPlay.value = false;
		musicInfoObj.musicPlayStatus.musicCurrentTime = musicInfoObj.musicPlayStatus.musicDuration;
	};
	return {
		isPlay,
		musicInfoObj,
		loadMusic,
		loadStorage,
		onEnded,
		onTimeUpdate,
		changePlayStatusButton,
		getMusicInfoStorage,
		getMusicPlayStatusStorage,
		getMusicIdStorage,
		changeCurrentTime,
	};
};

export default useMusicPlayer;
