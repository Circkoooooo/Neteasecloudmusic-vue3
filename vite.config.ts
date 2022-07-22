import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ElementPlus from 'unplugin-element-plus/vite';
import * as path from 'path';

export default defineConfig({
	base: './',
	resolve: {
		alias: {
			'~': path.resolve(__dirname, 'src'),
		},
	},
	plugins: [
		vue(), ElementPlus(),
	],
	build: {
		rollupOptions: {
			input: {
				bundle: './src/main.ts',
				main: './electron/main.js',
				index: './index.html',
			},
			output: {
				entryFileNames: '[name].js',
				dir: './dist',
			},
		},
	},
	css: {
		preprocessorOptions: {
			less: {
				additionalData: `@import "${path.resolve(
					__dirname,
					'src/styles/less-global.less',
				)}";`,
				javascriptEnabled: true,
			},
		},
	},
	server: {
		proxy: {
			'/api': {
				target: 'https://circle-neteasemusic.vercel.app/',
				changeOrigin: true,
				rewrite: (p) => p.replace(/^\/api/, ''),
			},
		},
	},
});
