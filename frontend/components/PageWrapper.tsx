"use client";
import React, { useEffect, ReactNode, FC, useState } from "react";
// Next
import { usePathname } from "next/navigation";
// Components
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loading from "@/app/[lang]/loading";
// Context
import { ThemeProvider } from "./context/theme-provider";

type WrapperProps = {
	children: ReactNode;
};

const PageWrapper: FC<WrapperProps> = ({ children }): JSX.Element => {
	const pathname: string = usePathname();
	const [currentPage, setCurrentPage] = useState<string>("");
	const [mounted, setMounted] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect((): void => {
		setCurrentPage(pathname);
	}, [pathname]);

	useEffect((): void => setMounted(true), []);

	useEffect((): void => {
		if (mounted) {
			setLoading(false);
		}
	}, [mounted]);

	if (loading) return <Loading />;

	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="light"
			enableSystem={false}
		>
			<div className="flex flex-col h-screen justify-between">
				<Navbar currentPage={currentPage} />
				<div className="mb-auto">{children}</div>
				<Footer />
			</div>
		</ThemeProvider>
	);
};

export default PageWrapper;
