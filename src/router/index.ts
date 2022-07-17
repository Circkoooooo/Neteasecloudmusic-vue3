import { createRouter, createWebHashHistory } from 'vue-router';

export const routes = [
	{
		path: '/',
		name: 'findMusic',
		component: () => import('../pages/FindMusic/FindMusic.vue'),
	},
	{
		path: '/musicdetail',
		name: 'musicdetail',
		component: () => import('../pages/MusicListDetail/MusicListDetail.vue'),
	},
];

export const router = createRouter({
	history: createWebHashHistory(),
	routes,
});
