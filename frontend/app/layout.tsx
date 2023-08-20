import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Components
import InitialLoader from "@/components/InitialLoader";
import PageWrapper from "@/components/PageWrapper";
// Context
import { LoadingProvider } from "@/components/context/LoadingContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Daniela Komanická | Chodím inak",
	description: "Vítam vás vo svete osobnej asistencie.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="sk">
			<body className={inter.className}>
				<div id="global-loader">
					<InitialLoader />
				</div>
				<LoadingProvider>
					<PageWrapper>{children}</PageWrapper>
				</LoadingProvider>
			</body>
		</html>
	);
};

export default RootLayout;
