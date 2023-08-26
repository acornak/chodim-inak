// React
import React, { FC, CSSProperties } from "react";
// Icons
import { IconProps } from "../shared/types";

type ChevronProps = IconProps & {
	style?: CSSProperties;
};

const ChevronRight: FC<ChevronProps> = ({
	fill = "None",
	stroke = "currentcolor",
	className,
	style,
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
			style={style}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M8.25 4.5l7.5 7.5-7.5 7.5"
			/>
		</svg>
	);
};

const ChevronLeft: FC<ChevronProps> = ({
	fill = "None",
	stroke = "currentcolor",
	className,
	style,
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
			style={style}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M15.75 4.5l-7.5 7.5 7.5 7.5"
			/>
		</svg>
	);
};

const ChevronDown: FC<ChevronProps> = ({
	fill = "None",
	stroke = "currentcolor",
	className,
	style,
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
			style={style}
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
