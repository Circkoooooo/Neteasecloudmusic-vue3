export type UserDetail = {
	identify: {
		imageUrl: string,
		imageDesc: string,
		actionUrl: string
	},
	level: number,
	listenSongs: number,
	userPoint: {
		userId: number,
		balance: number,
		updateTime: number,
		version: number,
		status: number,
		blockBalance: number
	},
	mobileSign: boolean,
	pcSign: boolean,
	profile: {
		privacyItemUnlimit: {
			area: boolean,
			college: boolean,
			age: boolean,
			villageAge: boolean
		},
		avatarDetail: {
			userType: string,
			identityLevel: number,
			identityIconUrl: string
		},
		avatarImgIdStr: string,
		backgroundImgIdStr: string,
		avatarImgId: number,
		birthday: number,
		gender: number,
		nickname: string,
		mutual: boolean,
		remarkName: string,
		description: string,
		defaultAvatar: boolean,
		followed: boolean,
		accountStatus: number,
		djStatus: number,
		vipType: number,
		authStatus: number,
		detailDescription: string,
		experts: {},
		expertTags: string,
		userId: number,
		createTime: number,
		province: number,
		city: number,
		avatarUrl: string,
		backgroundImgId: number,
		backgroundUrl: string,
		userType: number,
		signature: string,
		authority: number,
		allAuthTypes: [
			{
				type: number,
				desc: string,
				tags: string
			}
		],
		followeds: number,
		follows: number,
		blacklist: boolean,
		eventCount: number,
		allSubscribedCount: number,
		playlistBeSubscribedCount: number,
		mainAuthType: {
			type: number,
			desc: string,
			tags: string
		},
		avatarImgId_str: string,
		followTime: string,
		followMe: boolean,
		artistIdentity: [],
		cCount: number,
		inBlacklist: boolean,
		sDJPCount: number,
		playlistCount: number,
		sCount: number,
		newFollows: number
	},
	peopleCanSeeMyPlayRecord: boolean,
	bindings: [
		{
			expired: boolean,
			url: string,
			expiresIn: number,
			refreshTime: number,
			bindingTime: number,
			tokenJsonStr: string,
			userId: number,
			id: number,
			type: number
		}
	],
	adValid: boolean,
	code: number,
	createTime: number,
	createDays: number,
	profileVillageInfo: {
		title: string,
		imageUrl: string,
		targetUrl: string
	}
}
