export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			colors: {
				primary: '#00dc82',
				background: '#1e1e1e',
				surface: '#2e2e2e',
				text: '#ffffff',
			},
		},
	},
	plugins: [],
};
