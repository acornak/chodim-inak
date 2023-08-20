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
					200: "#8c8c8e",
					300: "#2c2c38",
					400: "#242430",
					500: "#191921",
				},
				secondary: "#fcc40c",
			},
		},
	},
	plugins: [],
};
export default config;
