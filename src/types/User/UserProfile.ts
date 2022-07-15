export type Profile = {
	accountStatus: number,
	allSubscribedCount: number,
	artistIdentity: [],
	authStatus: number,
	authority: number,
	avatarDetail: number,
	avatarImgId: number,
	avatarImgIdStr: string,
	avatarImgId_str: string,
	avatarUrl: string,
	backgroundImgId: number,
	backgroundImgIdStr: string,
	backgroundUrl: string,
	birthday: number,
	blacklist: boolean,
	city: number,
	createTime: number,
	followeds: number,
	follows: number,
	newFollows: number,
	nickname: string,
	playlistBeSubscribedCount:number,
	playlistCount: number,
	province: number,
	userId:number
}

export type Account = {
	anonimousUser: boolean,
	ban: number,
	baoyueVersion: number,
	createTime: number,
	donateVersion: number,
	id: number,
	paidFee: boolean,
	status: number,
	tokenVersion: number,
	type: number,
	userName: string,
	vipType: number,
	whitelistAuthority:number
}
export type UserProfile = {
	createTime: number,
	createDay: number,
	level: number,
	listenSongs: number,
	mobileSign: boolean,
	pcSign: boolean,
	peopleCanSeeMyPlayRecord: boolean,
	profile: Profile
}
