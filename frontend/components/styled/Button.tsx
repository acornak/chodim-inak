import React, { FC } from "react";
// Types and constants
import { StyledWithChildren } from "../shared/types";

const CTAButton: FC<StyledWithChildren> = ({ children }): JSX.Element => {
	return (
		<button className="bg-secondary-base text-white px-6 py-2 rounded hover:bg-primary-base transition uppercase">
			{children}
		</button>
	);
};

export { CTAButton };
