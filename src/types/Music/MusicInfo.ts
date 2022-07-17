export type MusicInfo = {
	name: string,
	id: number,
	ar: {
		id: number,
		name: string,
	}[],
	pop: number,
	v: number,
	al: {
		id: number,
		name: string,
		picUrl: string,
		pic_str: string,
		pic: number;
	},
	h: {
		br: number,
		fid: number,
		size: number,
		vd: number,
		sr: number;
	},
	m: {
		br: number,
		fid: number,
		size: number,
		vd: number,
		sr: number;
	},
	l: {
		br: number,
		fid: number,
		size: number,
		vd: number,
		sr: number;
	},
	copyright: string,
	mark: number,
	version: number,
	publishTime: number;
	fee:number,
}
