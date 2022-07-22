/* eslint-disable */
import { Ref } from 'vue';
import { MusicInfo } from './MusicInfo';

type MusicPlayerStatus = {
	musicDuration: number,
	musicCurrentTime: number
}
export type MusicPlayerMode = {
	modeEnum: ['心动', '顺序', '随机'],
	modeIndex: number,
}
export type MusicPlayerType = {
	isPlay: Ref<boolean>
	isLoading: Ref<boolean>
	musicInfoObj: {
		musicUrl: string,
		musicId: number,
		musicInfo: MusicInfo | null
		musicPlayStatus: MusicPlayerStatus
	},
	mode: Ref<MusicPlayerMode>,
	getMusicInfoStorage: () => null | MusicInfo;
	getMusicPlayStatusStorage: () => null | MusicPlayerStatus;
	getMusicIdStorage: () => number;
	saveMusicIdStorage: () => void;
	play: () => void;
	onTimeUpdate: () => void;
	loadMusic: (musicId: number, playNow: boolean, isHead: boolean, currentTime?: number) => Promise<void>;
	loadStorage: () => void;
	changePlayStatusButton: () => void;
	changeCurrentTime: (currentTime?: number) => void;
	onEnded: () => void;
	nextMusic: () => void;
	preMusic: () => void;
	changeMusic: (musicId: number) => void;
	scrobble: () => void;
	like: (liked: boolean) => Promise<void>;
	addMusicList: (musicInfo: MusicInfo) => void;
	replaceMusicList: (musicInfoList: MusicInfo[]) => void;
	clearPlayList: () => void;
	changeMod: () => void;
}
