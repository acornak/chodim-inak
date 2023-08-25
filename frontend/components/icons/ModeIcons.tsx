// React
import React, { FC } from "react";
// Icons
import { IconProps } from "../shared/types";

const DarkMode: FC<IconProps> = ({
	fill = "currentcolor",
	stroke = "currentcolor",
	className,
}): JSX.Element => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			data-name="Layer 1"
			viewBox="0 0 100 125"
			x="0px"
			y="0px"
			stroke={stroke}
			className={`w-5 h-5 ${className}`}
			fill={fill}
		>
			<path d="M70.3,45.27c0-6.44,2.55-9,9-9-6.44,0-9-2.55-9-9,0,6.45-2.55,9-9,9C67.75,36.28,70.3,38.83,70.3,45.27Zm5.61,3.45c0,4.26-1.69,6-6,6,4.26,0,6,1.69,6,5.95,0-4.26,1.69-5.95,6-5.95C77.6,54.67,75.91,53,75.91,48.72ZM53.58,31.88c0-3.05,1.21-4.26,4.26-4.26-3.05,0-4.26-1.21-4.26-4.26,0,3.05-1.21,4.26-4.26,4.26C52.37,27.62,53.58,28.83,53.58,31.88ZM65.44,75.94a48.15,48.15,0,0,1-22-73.44A48.15,48.15,0,1,0,93.53,77.71,47.87,47.87,0,0,1,65.44,75.94Z" />
		</svg>
	);
};

const LightMode: FC<IconProps> = ({
	fill = "currentcolor",
	stroke = "currentcolor",
	className,
}): JSX.Element => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			version="1.1"
			x="0px"
			y="0px"
			viewBox="0 0 64 80"
			stroke={stroke}
			className={`w-6 h-6 ${className}`}
			fill={fill}
		>
			<g>
				<rect x="30" y="4" width="4" height="10" />
				<rect x="30" y="50" width="4" height="10" />
				<rect x="50" y="30" width="10" height="4" />
				<rect x="4" y="30" width="10" height="4" />
				<rect
					x="43.3"
					y="13.7"
					transform="matrix(0.7071 -0.7071 0.7071 0.7071 3.0085 38.7364)"
					width="10"
					height="4"
				/>
				<rect
					x="10.7"
					y="46.3"
					transform="matrix(0.7071 -0.7071 0.7071 0.7071 -29.5182 25.2636)"
					width="10"
					height="4"
				/>
				<rect
					x="46.3"
					y="43.3"
					transform="matrix(0.7071 -0.7071 0.7071 0.7071 -19.9914 48.2656)"
					width="4"
					height="10"
				/>
				<rect
					x="13.7"
					y="10.7"
					transform="matrix(0.7071 -0.7071 0.7071 0.7071 -6.5182 15.7375)"
					width="4"
					height="10"
				/>
				<path d="M32,18c-7.7,0-14,6.3-14,14s6.3,14,14,14s14-6.3,14-14S39.7,18,32,18z M32,42c-5.5,0-10-4.5-10-10s4.5-10,10-10   s10,4.5,10,10S37.5,42,32,42z" />
			</g>
		</svg>
	);
};

export { DarkMode, LightMode };
