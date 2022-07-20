/* eslint-disable */
import { Ref } from 'vue';
import { MusicInfo } from './MusicInfo';

type MusicPlayerStatus = {
		musicDuration: number,
		musicCurrentTime: number
}
export type MusicPlayerType = {
	isPlay: Ref<boolean>
	isLoading: Ref<boolean>
	musicInfoObj:{
		musicUrl:string,
		musicId: number,
		musicInfo: MusicInfo| null
		musicPlayStatus: MusicPlayerStatus
	},
	saveMusicInfoStorage: () => void;
	getMusicInfoStorage: () => null | MusicInfo;
	getMusicPlayStatusStorage: () => null | MusicPlayerStatus;
	saveMusicPlayStatusStorage: () => void;
	getMusicIdStorage: () => number;
	saveMusicIdStorage: () => void;
	play: () => void;
	onTimeUpdate: () => void;
	loadMusic: (musicId: number, playNow: boolean, currentTime?: number) => Promise<void>;
	loadStorage: () => void;
	changePlayStatusButton: () => void;
	changeCurrentTime : (currentTime?:number) => void;
	onEnded: () => void;
	nextMusic: (musicId: number) => void;
	scrobble: () => void;
	like: (liked:boolean) => Promise<void>;
}
