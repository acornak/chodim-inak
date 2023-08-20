import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					base: "#29265b",
					dark: "#1e1b4d",
					light: "#3c3a6b",
				},
				secondary: {
					base: "#68c6eb",
					dark: "#4fa8c4",
					light: "#8cdcf5",
				},
				tertiary: {
					100: "#f2f2f2",
					200: "#e6e6e6",
					300: "#cccccc",
				},
			},
		},
	},
	plugins: [],
};
export default config;
