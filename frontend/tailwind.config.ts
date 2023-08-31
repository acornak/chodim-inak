import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: "class",
	content: [
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					base: "#6896c9",
					dark: "#3c5774",
					light: "#b4cbe4",
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
