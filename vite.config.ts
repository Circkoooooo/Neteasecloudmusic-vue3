<<<<<<< HEAD
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command }) => {
	return {
		base: './',
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
	}
})
=======
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

export default defineConfig({
	base: './',
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
	resolve: {
		alias: {
			'~': path.resolve(__dirname, './src'),
		},
	},
});
>>>>>>> 84e4f01 (chore(all): use husky and lint tools)
