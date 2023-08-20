import { ReactNode } from "react";

export type NavItem = {
	name: string;
	path: string;
};

export type StyledWithChildren = {
	children?: ReactNode;
};
