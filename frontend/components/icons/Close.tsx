// React
import React, { FC } from "react";
// Icons
import { IconProps } from "../shared/types";

const CloseIcon: FC<IconProps> = ({
	fill = "currentcolor",
	stroke = "currentcolor",
	className,
}): JSX.Element => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill={fill}
			stroke={stroke}
			className={`w-5 h-5 ${className}`}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M6 18L18 6M6 6l12 12"
				fill={fill}
			/>
		</svg>
	);
};

export default CloseIcon;
