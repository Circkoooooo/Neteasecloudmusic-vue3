export type Creative = {
	creativeType: 'list' | 'scroll_playlist';
	creativeId: string;
	resources: {
		uiElement: {
			mainTitle: {
				title: string;
			};
			image: {
				imageUrl: string;
			};
			labelTexts: string[];
			rcmdShowType: string;
		};
		resourceExtInfo: {
			playCount: number;
			highQuality: false;
			specialType: number;
		};
	}[];
};

export type HomePageRecommendMusicList = {
	blockCode: 'HOMEPAGE_BLOCK_PLAYLIST_RCMD';
	creatives: Creative[];
};

export type HomePageRecommendMusicStyleList = {
	blockCode: 'HOMEPAGE_BLOCK_STYLE_RCMD';
	creatives: Creative[];
};
