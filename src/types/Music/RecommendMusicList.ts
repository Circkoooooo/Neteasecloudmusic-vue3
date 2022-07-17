export type Creator = {
	accountStatus: number;
	authStatus: number;
	authority: number;
	avatarImgId: number;
	avatarImgIdStr: string;
	avatarUrl: string;
	backgroundImgId: number;
	backgroundImgIdStr: string;
	backgroundUrl: string;
	birthday: number;
	city: number;
	defaultAvatar: boolean;
	description: string;
	detailDescription: string;
	djStatus: number;
	expertTags: string[];
	followed: boolean;
	gender: number;
	mutual: boolean;
	nickname: string;
	province: number;
	remarkName: string;
	signature: string;
	userId: number;
	userType: number;
	vipType: number;
};
/**
 * recommendMusicList
 */
export type RecommendMusicList = {
	alg: string;
	copywriter: string;
	createTime: string;
	creator?: Creator;
	id: number;
	name: string;
	picUrl: string;
	playcount: number;
	trackCount: number;
	type: number;
	userId: number;
};
