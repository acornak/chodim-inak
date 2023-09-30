"use client";
import React, { ReactNode, FC, useEffect } from "react";
// Components
import Navbar from "./navbar/Navbar";
import Footer from "./Footer";
// Misc
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
// Context
import { ThemeProvider } from "./context/theme-provider";

type WrapperProps = {
	children: ReactNode;
};

const PageWrapper: FC<WrapperProps> = ({ children }): JSX.Element => {
	useEffect(() => {
		const handleContextMenu = (e: Event) => {
			if (e.target instanceof HTMLImageElement) {
				e.preventDefault();
			}
		};

		window.addEventListener("contextmenu", handleContextMenu);

		return () => {
			window.removeEventListener("contextmenu", handleContextMenu);
		};
	}, []);

	return (
		<GoogleReCaptchaProvider
			reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
			scriptProps={{
				async: false,
				defer: false,
				appendTo: "head",
				nonce: undefined,
			}}
		>
			<ThemeProvider
				attribute="class"
				defaultTheme="light"
				enableSystem={true}
			>
				<div className="flex flex-col min-h-screen justify-between">
					<Navbar />
					<div>{children}</div>
					<Footer />
				</div>
			</ThemeProvider>
		</GoogleReCaptchaProvider>
	);
};

export default PageWrapper;
