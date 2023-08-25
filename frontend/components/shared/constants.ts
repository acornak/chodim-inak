// Types and constants
import { NavItem } from "./types";

export const NavItems: NavItem[] = [
	{
		name: "Domov",
		path: "/",
		children: [
			{
				name: "Môj príbeh",
				path: "#story",
			},
			{
				name: "Referencie",
				path: "#references",
			},
			{
				name: "Asistentské desatoro",
				path: "#oa",
			},
		],
	},
	{
		name: "Asistenčný kalendár",
		path: "/calendar",
	},
	{
		name: "Blog",
		path: "/blog",
	},
	{
		name: "FAQ",
		path: "/faq",
	},
];
