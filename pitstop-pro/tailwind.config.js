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
				border: '#3f3f3f',
				accent: '#00b36b',
				input: '#383838',
				'text-muted': '#bfbfbf',
				destructive: '#ef4444',
				'muted-foreground': '#9ca3af',
				warning: '#facc15',
			},
			spacing: {
				navbar: '6rem',
			},
		},
	},
	plugins: [],
};
