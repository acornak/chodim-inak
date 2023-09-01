"use client";
import React, {
	FC,
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
} from "react";
import { debounce } from "lodash";
// Next.js
import { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
// Context
import { useTheme } from "next-themes";
// Components
import NavMobileOpen from "./NavMobile";
// Functions
import { getLocaleFromPath } from "../shared/functions";
import { useScroll } from "../shared/hooks";
// Types and constants
import { NavItems, bgColor } from "../shared/constants";
// Images and icons
import logoLight from "@/public/logo-light.png";
import logoDark from "@/public/logo-dark.png";

import {
	Logo,
	MenuItem,
	MobileMenuButton,
	OtherControls,
} from "./NavbarDesktop";

const Navbar: FC = (): JSX.Element => {
	const { theme } = useTheme();
	const currentPage: string = usePathname();
	const locale: string = useMemo(
		(): string => getLocaleFromPath(currentPage)!.toLowerCase(),
		[currentPage],
	);
	const bg: string = useMemo(
		(): string => bgColor(currentPage, locale),
		[currentPage, locale],
	);
	const isScrolled: boolean = useScroll();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

	const initialTextColor =
		currentPage === "/" + locale && !isScrolled
			? "text-white dark:text-gray-300"
			: "text-gray-700 dark:text-gray-300";
	const initialLogo =
		(currentPage === "/" + locale && !isScrolled) || theme === "dark"
			? logoDark
			: logoLight;

	const [logo, setLogo] = useState<StaticImageData>(logoDark);
	const [textColor, setTextColor] = useState<string>(initialTextColor);

	const [isMobile, setIsMobile] = useState<boolean>(false);

	const textColorHover: string =
		currentPage === "/" + locale
			? `${textColor}`
			: `${textColor} hover:text-black dark:hover:text-white`;

	const underline: string =
		currentPage === "/" + locale
			? "bg-white dark:bg-gray-300"
			: "bg-primary-base dark:bg-white";

	useEffect((): void => {
		setTextColor(initialTextColor);
		setLogo(initialLogo);
	}, [currentPage, theme, isScrolled, locale, initialLogo, initialTextColor]);

	useLayoutEffect((): (() => void) => {
		const handleResize = debounce(
			() => setIsMobile(window.innerWidth <= 768),
			100,
		);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<nav
			className={`${
				isScrolled ? "bg-white dark:bg-gray-800" : bg
			} fixed top-0 w-full z-20 py-4`}
		>
			<div className="container mx-auto flex justify-between items-center px-6 md:px-0">
				<Logo
					locale={locale}
					logo={logo}
					biggerLogo={currentPage === "/" + locale && !isScrolled}
				/>
				<MobileMenuButton
					setIsMobileMenuOpen={setIsMobileMenuOpen}
					textColor={textColor}
				/>
				<NavMobileOpen
					closeMenu={() => setIsMobileMenuOpen(false)}
					menuOpen={isMobileMenuOpen}
				/>
				<ul className="hidden text-sm lg:text-lg md:flex flex-grow justify-center items-center space-x-0">
					{NavItems.map((item, index) => (
						<MenuItem
							index={index}
							key={index}
							item={item}
							locale={locale}
							textColorHover={textColorHover}
							currentPage={currentPage}
							underline={underline}
							isMobile={isMobile}
						/>
					))}
				</ul>
				<OtherControls
					isScrolled={isScrolled}
					bg={bg}
					textColor={textColor}
				/>
			</div>
		</nav>
	);
};

export default Navbar;
