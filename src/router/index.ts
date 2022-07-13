import { createRouter, createWebHashHistory } from 'vue-router';

export const routes = [
	{
		path: '/',
		name: 'pagehome',
		component: () => import('../pages/PageHome/PageHome.vue'),
	},
];

export const router = createRouter({
	history: createWebHashHistory(),
	routes,
});
