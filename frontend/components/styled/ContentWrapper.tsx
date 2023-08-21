import React, { FC } from "react";
// Types and constants
import { StyledWithChildren } from "../shared/types";

const ContentWrapper: FC<StyledWithChildren> = ({ children }): JSX.Element => {
	return <div className="m-6">{children}</div>;
};

export default ContentWrapper;
