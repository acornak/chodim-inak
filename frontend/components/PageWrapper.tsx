"use client";
import React, { useEffect, ReactNode, FC, useState } from "react";
// Next
import { usePathname } from "next/navigation";
// Components
import Navbar from "./Navbar";
import Footer from "./Footer";
// Context
import { ThemeProvider } from "./context/theme-provider";

type WrapperProps = {
	children: ReactNode;
};

const PageWrapper: FC<WrapperProps> = ({ children }): JSX.Element => {
	const pathname: string = usePathname();
	const [currentPage, setCurrentPage] = useState<string>("");

	useEffect((): void => {
		setCurrentPage(pathname);
	}, [pathname]);

	return (
		<ThemeProvider attribute="class" defaultTheme="system">
			<div className="flex flex-col h-screen justify-between">
				<Navbar currentPage={currentPage} />
				<div className="mb-auto">{children}</div>
				<Footer />
			</div>
		</ThemeProvider>
	);
};

export default PageWrapper;
