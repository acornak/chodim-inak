import React, { ReactNode } from "react";
import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import PageWrapper from "@/components/PageWrapper";

const dmSans = DM_Sans({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Daniela Komanická | Chodím inak",
	description: "Vítam vás vo svete osobnej asistencie.",
};

export async function generateStaticParams() {
	return [{ lang: "en" }, { lang: "sk" }];
}

const RootLayout = ({
	children,
	params,
}: {
	children: ReactNode;
	params: { lang: string };
}) => {
	return (
		<html lang={params.lang}>
			<body className={dmSans.className}>
				<PageWrapper>{children}</PageWrapper>
			</body>
		</html>
	);
};

export default RootLayout;
