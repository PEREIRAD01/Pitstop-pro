import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	base: '/Pitstop-pro/',
	plugins: [react()],
	server: {
		port: 3000,
	},
});
