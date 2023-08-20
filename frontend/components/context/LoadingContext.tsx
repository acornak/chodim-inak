"use client";
import React, { useContext } from "react";

interface LoadingContextProps {
	pageLoaded: boolean;
	setPageLoaded: (isLoading: boolean) => void;
}

const LoadingContext = React.createContext<LoadingContextProps>({
	pageLoaded: false,
	setPageLoaded: () => {},
});

export function useLoadingCtx(): LoadingContextProps {
	return useContext(LoadingContext);
}

export const LoadingProvider = ({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element => {
	const [pageLoaded, setPageLoaded] = React.useState<boolean>(false);

	return (
		<LoadingContext.Provider
			value={{
				pageLoaded,
				setPageLoaded,
			}}
		>
			{children}
		</LoadingContext.Provider>
	);
};
