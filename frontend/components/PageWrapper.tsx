"use client";
import React, { useEffect, ReactNode, FC } from "react";
// Context
import { useLoadingCtx } from "./context/LoadingContext";

type WrapperProps = {
	children: ReactNode;
};

const PageWrapper: FC<WrapperProps> = ({ children }): JSX.Element => {
	const { setPageLoaded } = useLoadingCtx();

	useEffect((): (() => void) => {
		const timer = setTimeout(() => {
			if (typeof window !== "undefined") {
				const loader = document.getElementById("global-loader");
				if (loader) {
					loader.remove();
					setPageLoaded(true);
				}
			}
		}, 1100);

		return () => clearTimeout(timer);
	}, [setPageLoaded]);

	return <>{children}</>;
};

export default PageWrapper;
