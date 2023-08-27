import React, { ReactNode, FC } from "react";
// Components
import Navbar from "./navbar/Navbar";
import Footer from "./Footer";

// Context
import { ThemeProvider } from "./context/theme-provider";

type WrapperProps = {
	children: ReactNode;
};

const PageWrapper: FC<WrapperProps> = ({ children }): JSX.Element => {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="light"
			enableSystem={true}
		>
			<div className="flex flex-col h-screen justify-between">
				<Navbar />
				<div className="mb-auto">{children}</div>
				<Footer />
			</div>
		</ThemeProvider>
	);
};

export default PageWrapper;
