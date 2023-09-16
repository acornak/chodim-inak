import { ReactNode } from "react";

export type NavItem = {
	name: {
		en: string;
		sk: string;
		[lang: string]: string | undefined;
	};
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

export type Category = {
	title: string;
};

export type BlogContent = {
	_type: string;
	style: string;
	children?: [
		{
			text: string;
			_type: string;
			marks: string[];
		},
	];
	listItem?: string;
	level?: number;
	markDefs?: [
		{
			_type: string;
			href: string;
		},
	];
	asset?: {
		_type: string;
		_ref: string;
	};
};

export type BlogPost = {
	_id: string;
	title: string;
	slug: {
		current: string;
	};
	publishedAt: string;
	mainImage: {
		asset: {
			url: string;
		};
	};
	tags: string[];
	categories: Category[];
	leadRaw: BlogContent[];
	bodyRaw: BlogContent[];
	author: {
		name: string;
	};
};
