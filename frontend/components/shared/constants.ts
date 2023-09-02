// Types and constants
import { NavItem } from "./types";

export const bgColor = (currentPage: string, locale: string): string => {
	return currentPage === "/" + locale
		? "bg-transparent"
		: "bg-white dark:bg-gray-800";
};

export const NavItems: NavItem[] = [
	{
		name: { sk: "Domov", en: "Home" },
		path: "/",
		children: [
			{
				name: { sk: "O mne", en: "About me" },
				path: "#me",
			},
			{
				name: { sk: "O asistencii", en: "About assistance" },
				path: "#assistance",
			},
		],
	},
	{
		name: { sk: "Asistenčný kalendár", en: "Assistance calendar" },
		path: "/calendar",
	},
	{
		name: { sk: "Blog", en: "Blog" },
		path: "/blog",
	},
	{
		name: { sk: "FAQ", en: "FAQ" },
		path: "/faq",
	},
];
