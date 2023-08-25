import React, { FC } from "react";
// Types and constants
import { StyledWithChildren } from "../shared/types";

type ContentWraper = StyledWithChildren & {
	id?: string;
};

const ContentWrapper: FC<ContentWraper> = ({ children, id }): JSX.Element => {
	return (
		<div className="m-6" id={id}>
			{children}
		</div>
	);
};

export default ContentWrapper;
