import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

export default defineConfig({
	base: './',
	resolve: {
		alias: {
			'~': path.resolve(__dirname, 'src'),
		},
	},
	plugins: [vue()],
	build: {
		rollupOptions: {
			input: {
				bundle: './src/main.ts',
				main: './main.js',
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
});
