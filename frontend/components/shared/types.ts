import { ReactNode } from "react";

export type NavItem = {
	name: string;
	path: string;
	children?: NavItem[];
};

export type StyledWithChildren = {
	children?: ReactNode;
};

export type IconProps = {
	width?: number;
	height?: number;
	fill?: string;
	className?: string;
	stroke?: string;
};
