import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PageWrapper from "@/components/PageWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Daniela Komanická | Chodím inak",
	description: "Vítam vás vo svete osobnej asistencie.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="sk">
			<body className={inter.className}>
				<PageWrapper>{children}</PageWrapper>
			</body>
		</html>
	);
};

export default RootLayout;
