import { createRouter, createWebHashHistory } from 'vue-router';
import routerNamespace from './routerNamespace';

export const routes = [
	{
		path: routerNamespace.Home.path,
		name: routerNamespace.Home.name,
		component: () => import('../pages/FindMusic/FindMusic.vue'),
	},
	{
		path: routerNamespace.ListDetail.path,
		name: routerNamespace.ListDetail.name,
		component: () => import('../pages/ListDetail/ListDetail.vue'),
	},
	{
		path: routerNamespace.LikeMusic.path,
		name: routerNamespace.LikeMusic.name,
		component: () => import('../pages/LikeMusic/LikeMusic.vue'),
	},
];

export const router = createRouter({
	history: createWebHashHistory(),
	routes,
});
