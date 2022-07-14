export type HomePageBanner = {
	blockCode: 'HOMEPAGE_BANNER',
	extInfo: {
		banners: {
			bannerId: string,
			pic?: string,
			song?: {
				al?: {
					id?: number,
					name?: string,
					picUrl?: string,
					pic?: number,
				},
				alia?: string[],
				ar?: {
					alias?: string[],
					id?: number,
					name?: string
				}[],
				h?: {
					br?: number,
					fid?: number,
					size?: number,
					vd?: number,
					sr?: number
				},
				hr?: {
					br?: number,
					fid?: number,
					size?: number,
					vd?: number,
					sr?: number
				},
				l?: {
					br?: number,
					fid?: number,
					size?: number,
					vd?: number,
					sr?: number
				},
				m?: {
					br?: number,
					fid?: number,
					size?: number,
					vd?: number,
					sr?: number
				},
				name?: string,
				publishTime?: number,

			}
		}[]
		targetId?: number,
		typeTitle?: string
	}
}
