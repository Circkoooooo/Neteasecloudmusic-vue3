import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import * as path from 'path';

export default defineConfig({
	base: './',
	resolve: {
		alias: {
			'~': path.resolve(__dirname, 'src'),
		},
	},
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
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
