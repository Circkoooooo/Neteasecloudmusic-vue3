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
