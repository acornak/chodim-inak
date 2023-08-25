"use client";
// React
import React, { FC } from "react";
// Icons
import { IconProps } from "../shared/types";

const ChevronRight: FC<IconProps> = ({
	fill = "None",
	stroke = "currentcolor",
	className,
}): JSX.Element => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill={fill}
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke={stroke}
			className={`w-5 h-5 ${className}`}
			data-testid="chevron-right"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M8.25 4.5l7.5 7.5-7.5 7.5"
			/>
		</svg>
	);
};

const ChevronLeft: FC<IconProps> = ({
	fill = "None",
	stroke = "currentcolor",
	className,
}): JSX.Element => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill={fill}
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke={stroke}
			className={`w-5 h-5 ${className}`}
			data-testid="chevron-left"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M15.75 4.5l-7.5 7.5 7.5 7.5"
			/>
		</svg>
	);
};

const ChevronDown: FC<IconProps> = ({
	fill = "None",
	stroke = "currentcolor",
	className,
}): JSX.Element => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill={fill}
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke={stroke}
			className={`w-5 h-5 ${className}`}
			data-testid="chevron-left"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M4.5 8.25l7.5 7.5 7.5-7.5"
			/>
		</svg>
	);
};

export { ChevronLeft, ChevronRight, ChevronDown };
