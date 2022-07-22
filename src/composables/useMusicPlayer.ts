import axios from 'axios';
import {
	reactive,
	Ref,
	ref, watch,
} from 'vue';
import postUrl from '~/axios/postUrl';
import usePlayListStore from '~/store/playListStore';
import useMusicDetailStore from '~/store/musicDetailStore';
import useUserLikeListStore from '~/store/userLikeListStore';
import useUserStore from '~/store/UserStore';
import { MusicInfo } from '~/types/Music/MusicInfo';
import { MusicPlayerMode, MusicPlayerType } from '~/types/Music/MusicPlayer';
import saveUserLikeList from './saveUserLikeList';
import userPlayList from './userPlayList';

const storageNamespace = {
	musicInfo: 'currentMusicInfo',
	musicPlayStatus: 'musicPlayStatus',
	musicId: 'musicId',
};
const useMusicPlayer = (musicSource: Ref<HTMLAudioElement | null>): MusicPlayerType => {
	const musicDetailStore = useMusicDetailStore();
	const playlistStore = usePlayListStore();
	const userStore = useUserStore();
	const userLikeListStore = useUserLikeListStore();

	const isLoading = ref(false);
	const mode = ref<MusicPlayerMode>({
		modeEnum: ['心动', '顺序', '随机'],
		modeIndex: 1,
	});
	const musicInfoObj = reactive<{
		musicUrl: string, // current music
		musicId: number,
		musicInfo: MusicInfo | null
		musicPlayStatus: {
			musicDuration: number,
			musicCurrentTime: number
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
		let sourceId = musicDetailStore.loadedListId;
		if (!sourceId) {
			sourceId = musicInfoObj.musicInfo!.al.id;
		}
		const timestamp = new Date().getTime();
		axios.post(postUrl.scrobble, null, {
			params: {
				id: musicInfoObj.musicId,
				sourceId,
				time: Math.ceil(musicInfoObj.musicPlayStatus.musicCurrentTime),
				timestamp,
			},
		});
	};
	const addMusicList = (musicInfo: MusicInfo) => {
		const findIndex = playlistStore.playList.findIndex((item) => item.id === musicInfo.id);
		if (findIndex === -1) {
			playlistStore.playList.unshift(musicInfo);
		}
		for (let i = findIndex; i >= findIndex; i -= 1) {
			playlistStore.playList[i] = playlistStore.playList[i - 1];
		}
		playlistStore.playList[0] = musicInfo;
	};

	const updateCurrentIndex = () => {
		const index = playlistStore.playList.findIndex((item) => item.id === musicInfoObj.musicId);
		playlistStore.currentIndex = index;
	};

	// be excuted after loadmusic
	const play = (currentTime: number, playNow: boolean, callBack: () => void) => {
		if (musicSource.value === null) return;
		musicSource.value!.src = musicInfoObj.musicUrl;
		musicSource.value!.currentTime = currentTime;

		musicSource.value.oncanplay = () => {
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

	const loadMusic = async (
		musicId: number,
		playNow: boolean,
		isHead: boolean,
		currentTime: number = 0,
	) => {
		isPlay.value = false;
		isLoading.value = true;
		// storageMusicPlayStatus
		if (musicSource.value === null) return;

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
			isLoading.value = false;
			musicInfoObj.musicInfo = musicInfoTemp;
			musicInfoObj.musicPlayStatus.musicCurrentTime = currentTime;
			musicInfoObj.musicId = musicId;
			saveMusicInfoStorage();
			saveMusicPlayStatusStorage();
			saveMusicIdStorage();
			if (musicInfoObj.musicInfo !== null) {
				if (isHead) {
					addMusicList(musicInfoObj.musicInfo);
				}
				updateCurrentIndex();
			}
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
			loadMusic(musicId, false, false, musicInfoObj.musicPlayStatus.musicCurrentTime);
		} else {
			const data = getMusicInfoStorage();
			if (!data || !data.id) return;
			const { id } = data;
			loadMusic(id, false, false);
		}
	};

	const changePlayStatusButton = () => {
		if (musicSource.value === null || !musicSource.value.src || isLoading.value) return;
		isPlay.value = !isPlay.value;
		// save currentTime every click
		saveMusicPlayStatusStorage();
	};

	const changeCurrentTime = (currentTime?: number) => {
		if (currentTime === undefined) return;
		musicSource.value!.currentTime = currentTime;
	};

	const changeMusic = (musicId: number) => {
		scrobble();
		if (musicSource.value === null) return;
		if (playlistStore.playList.findIndex((item) => item.id === musicId) === -1) {
			loadMusic(musicId, true, true);
		} else {
			loadMusic(musicId, true, false);
		}
	};

	const preMusic = () => {
		let index = playlistStore.currentIndex;
		if (index === 0) {
			index = playlistStore.playList.length - 1;
		} else {
			index -= 1;
		}
		loadMusic(playlistStore.playList[index].id, true, false);
	};

	const nextMusic = () => {
		let index = playlistStore.currentIndex;
		index = (index + 1) % playlistStore.playList.length;
		loadMusic(playlistStore.playList[index].id, true, false);
	};

	const like = async (liked: boolean) => {
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
				if (res.data.code === 200 && userStore.account !== null && userStore.profile !== null) {
					saveUserLikeList(userStore.account.id);
					userPlayList(userStore.account.id);
				}
			});
		}
	};

	const replaceMusicList = (musicInfoList: MusicInfo[]) => {
		loadMusic(musicInfoList[0].id, true, false);
		playlistStore.playList = musicInfoList;
	};

	const onEnded = () => {
		isPlay.value = false;
		musicInfoObj.musicPlayStatus.musicCurrentTime = musicInfoObj.musicPlayStatus.musicDuration;
		nextMusic();
	};

	const clearPlayList = () => {
		playlistStore.playList = [];
		isPlay.value = false;
		playlistStore.currentIndex = -1;
		if (musicSource.value) {
			musicSource.value.src = '';
		}
		musicInfoObj.musicInfo = null;
		musicInfoObj.musicId = 0;
		musicInfoObj.musicUrl = '';
	};

	const useModeSelect = () => {
		const md = mode.value.modeEnum[mode.value.modeIndex];
		if (md === '随机') {
			const currentId = musicInfoObj.musicInfo?.id;
			const copyList = Array.from(playlistStore.playList);
			copyList.sort(() => Math.random() - 0.5);
			const currentMusicId = copyList.findIndex((music) => music.id === currentId);
			playlistStore.playList = copyList;
			playlistStore.currentIndex = currentMusicId;
		} else if (md === '顺序') {
			playlistStore.playList = playlistStore.sortPlayList;
		} else if (md === '心动') {
			axios.post(postUrl.heartPlayList, null, {
				params: {
					id: playlistStore.playList[playlistStore.currentIndex].id,
					pid: !musicDetailStore.loadedListId ? userLikeListStore.likeListId
						: musicDetailStore.loadedListId,
				},
			}).then((res) => {
				if (res.data.code === 200) {
					const list: MusicInfo[] = [];
					for (let i = 0; i < res.data.data.length; i += 1) {
						list.push(res.data.data[i].songInfo);
					}
					playlistStore.playList = list;
				}
				if (playlistStore.playList.findIndex((item) => item.id === musicInfoObj.musicId) === -1) {
					playlistStore.playList.unshift(musicInfoObj.musicInfo as MusicInfo);
				}
				updateCurrentIndex();
			});
		}
	};

	const changeMod = () => {
		mode.value.modeIndex = (mode.value.modeIndex + 1) % mode.value.modeEnum.length;
		useModeSelect();
	};

	return {
		isPlay,
		isLoading,
		musicInfoObj,
		mode,
		play,
		saveMusicIdStorage,
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
		preMusic,
		changeMusic,
		scrobble,
		like,
		addMusicList,
		replaceMusicList,
		clearPlayList,
		changeMod,
		useModeSelect,
	} as MusicPlayerType;
};

export default useMusicPlayer;
