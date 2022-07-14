import { createRouter, createWebHashHistory } from 'vue-router';

export const routes = [
	{
		path: '/',
		name: 'findMusic',
		component: () => import('../pages/FindMusic/FindMusic.vue'),
	},
];

export const router = createRouter({
	history: createWebHashHistory(),
	routes,
});
