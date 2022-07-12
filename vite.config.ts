import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
	base: path.resolve(__dirname, './dist'),
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
})
