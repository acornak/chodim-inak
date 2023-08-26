// Types and constants
import { NavItem } from "./types";

export const NavItems: NavItem[] = [
	{
		name: { sk: "Domov", en: "Home" },
		path: "/",
		children: [
			{
				name: { sk: "Môj príbeh", en: "My story" },
				path: "#story",
			},
			{
				name: { sk: "Referencie", en: "References" },
				path: "#references",
			},
			{
				name: {
					sk: "Asistentské desatoro",
					en: "Assistant's Decalogue",
				},
				path: "#oa",
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
