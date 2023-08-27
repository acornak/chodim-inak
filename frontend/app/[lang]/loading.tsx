import React from "react";

const Loading = (): JSX.Element => {
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-light dark:border-primary-dark" />
		</div>
	);
};

export default Loading;
