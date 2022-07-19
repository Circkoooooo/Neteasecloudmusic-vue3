import axios from 'axios';
import {
	reactive,
	Ref, ref, watch,
} from 'vue';
import postUrl from '~/axios/postUrl';
import useMusicDetailStore from '~/store/musicDetailStore';
import useUserStore from '~/store/UserStore';
import { MusicInfo } from '~/types/Music/MusicInfo';
import { MusicPlayerType } from '~/types/Music/MusicPlayer';
import saveUserLikeList from './saveUserLikeList';

const storageNamespace = {
	musicInfo: 'currentMusicInfo',
	musicPlayStatus: 'musicPlayStatus',
	musicId: 'musicId',
};

const useMusicPlayer = (musicSource: Ref<HTMLAudioElement | null>):MusicPlayerType => {
	const musicDetailStore = useMusicDetailStore();
	const userStore = useUserStore();

	const musicInfoObj = reactive<{
		musicUrl:string, // current music
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

	// // get musicInfo.
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

	// update listen data
	const scrobble = () => {
		let sourceId = musicDetailStore.playlist.id;
		if (!sourceId) {
			sourceId = musicInfoObj.musicInfo!.al.id;
		}
		axios.post(postUrl.scrobble, null, {
			params: {
				id: musicInfoObj.musicId,
				sourceId,
				time: Math.ceil(musicInfoObj.musicPlayStatus.musicCurrentTime),
			},
		});
	};
	// be excuted after loadmusic
	const play = (currentTime:number, playNow:boolean, callBack:()=>void) => {
		if (musicSource.value === null) return;
		musicSource.value!.src = musicInfoObj.musicUrl;
		musicSource.value!.currentTime = currentTime;
		musicSource.value.oncanplay = () => {
			scrobble();
			if (playNow) {
				isPlay.value = playNow;
			}
		};
		callBack();
	};

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

	const loadMusic = async (musicId: number, playNow: boolean, currentTime: number = 0) => {
		isPlay.value = false;
		// storageMusicPlayStatus
		if (musicSource.value === null) return;

		musicInfoObj.musicInfo!.al.picUrl = '';
		musicInfoObj.musicInfo!.name = '加载中';
		musicInfoObj.musicInfo!.ar = [{ id: 0, name: '加载中' }];

		const url = await axios.post(postUrl.getMusicUrlById, null, {
			params: {
				id: musicId,
			},
		}).then((res) => res.data.data[0].url);
		const musicInfoTemp = await axios.post(postUrl.getMusicInfoByIds, null, {
			params: {
				ids: musicId,
			},
		}).then((res) => res.data.songs[0]);
		musicInfoObj.musicUrl = url;
		// saveStorage
		play(currentTime, playNow, () => {
			musicInfoObj.musicInfo = musicInfoTemp;
			musicInfoObj.musicPlayStatus.musicCurrentTime = currentTime;
			musicInfoObj.musicId = musicId;
			saveMusicInfoStorage();
			saveMusicPlayStatusStorage();
			saveMusicIdStorage();
		});
	};

	/**
	 * play a music use the music data in localstorage
	 * @returns
	 */
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
			if (!data || !data.id) return;
			const { id } = data;
			loadMusic(id, false);
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

	const nextMusic = (musicId: number) => {
		if (musicSource.value === null) return;
		scrobble();
		loadMusic(musicId, true);
	};

	const like = async (liked:boolean) => {
		const id = musicInfoObj.musicId;
		const timestamp = new Date().getTime();
		if (id) {
			axios.post(postUrl.like, null, {
				params: {
					id,
					like: !liked,
					timestamp,
				},
			}).then((res) => {
				if (res.data.code === 200 && userStore.account?.id) {
					saveUserLikeList(userStore.account.id);
				}
			});
		}
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
		nextMusic,
		scrobble,
		like,
	} as MusicPlayerType;
};

export default useMusicPlayer;
