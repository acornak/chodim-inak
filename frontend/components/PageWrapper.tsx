"use client";
import React, { useEffect, ReactNode, FC, useState } from "react";
// Next
import { usePathname } from "next/navigation";
// Components
import Navbar from "./Navbar";
import Footer from "./Footer";
// Context
import { useLoadingCtx } from "./context/LoadingContext";

type WrapperProps = {
	children: ReactNode;
};

const PageWrapper: FC<WrapperProps> = ({ children }): JSX.Element => {
	const { setPageLoaded } = useLoadingCtx();
	const pathname: string = usePathname();
	const [currentPage, setCurrentPage] = useState<string>("");

	useEffect((): void => {
		setCurrentPage(pathname);
	}, [pathname]);

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

	return (
		<div className="flex flex-col h-screen justify-between">
			<Navbar currentPage={currentPage} />
			<div className="mb-auto">{children}</div>
			<Footer />
		</div>
	);
};

export default PageWrapper;
