"use client";
import React, { FC, useEffect, useState } from "react";
// Next.js
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
// Context
import { useTheme } from "next-themes";
// Components
import ModeSwitch from "./ModeSwitch";
import LanguageSwitch from "./LanguageSwitch";
// Types and constants
import { NavItems } from "./shared/constants";
// Images and icons
import logoLight from "@/public/logo-light.png";
import logoDark from "@/public/logo-dark.png";
import { ChevronDown } from "./icons/Chevrons";
import BarsIcon from "./icons/Bars";
import CloseIcon from "./icons/Close";

type NavbarProps = {
	currentPage: string;
};

type NavMobileOpenProps = {
	closeMenu: () => void;
	menuOpen: boolean;
};

const NavMobileOpen: FC<NavMobileOpenProps> = ({ closeMenu, menuOpen }) => {
	const [showChildren, setShowChildren] = useState<number>(-1);
	const [rotateIndex, setRotateIndex] = useState<number | null>(null);

	const toggleChildren = (index: number) => {
		setRotateIndex(index === rotateIndex ? null : index);
		setShowChildren(showChildren === index ? -1 : index);
	};

	const [menuStyle, setMenuStyle] = useState({
		transform: "translateX(100%)",
		transition: "",
	});

	useEffect(() => {
		if (menuOpen) {
			setMenuStyle({
				transform: "translateX(0%)",
				transition: "transform 0.3s ease-in-out",
			});
		} else {
			setMenuStyle({
				transform: "translateX(100%)",
				transition: "transform 0.3s ease-in-out",
			});
		}
	}, [menuOpen]);

	return (
		<div
			style={menuStyle}
			className="md:hidden fixed top-0 right-0 w-1/2 h-full bg-white dark:bg-gray-800 flex flex-col space-y-4 py-8 px-6 text-gray-700 dark:text-gray-300"
		>
			<button
				style={menuStyle}
				className={`absolute top-0 left-[-48px] bg-gray-600 p-2`}
				onClick={closeMenu}
			>
				<CloseIcon className="w-8 h-8 text-white" />
			</button>

			<ul className="flex flex-col space-y-4 uppercase font-semibold">
				{NavItems.map((item, index) => (
					<li key={index}>
						<div className="relative flex items-center justify-between uppercase text-sm">
							<Link
								href={`${item.path}${item.path}`}
								className="relative z-10 transition-colors group"
							>
								<span className="inline-block relative overflow-hidden hover:text-black dark:hover:text-white">
									{item.name}
									<span className="absolute left-0 bottom-0 h-0.5 w-0 bg-secondary-base group-hover:w-full transition-all ease-in-out duration-200"></span>
								</span>
							</Link>
							{item.children && (
								<button
									onClick={() => toggleChildren(index)}
									className="flex items-center"
								>
									<ChevronDown
										className="inline-block ml-1 align-middle"
										style={{
											transform:
												rotateIndex === index
													? "rotate(90deg)"
													: "",
											transition:
												"transform 0.3s ease-in-out",
										}}
									/>
								</button>
							)}
						</div>

						<ul
							className="pl-4 text-sm space-y-2 pt-2"
							style={{
								maxHeight:
									rotateIndex === index ? "500px" : "0px",
								overflow: "hidden",
								transition: "max-height 0.5s ease-in-out",
							}}
						>
							{item.children?.map((child, childIndex) => (
								<li key={childIndex} className="relative group">
									<Link
										href={`${item.path}${child.path}`}
										className="relative z-10 transition-colors"
									>
										<span className="inline-block relative overflow-hidden hover:text-black dark:hover:text-white">
											{child.name}
											<span className="absolute left-0 bottom-0 h-0.5 w-0 bg-secondary-base group-hover:w-full transition-all ease-in-out duration-200"></span>
										</span>
									</Link>
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>

			<div className="flex text-gray-700 dark:text-gray-300 uppercase justify-between text-xs">
				<LanguageSwitch />
				<ModeSwitch />
			</div>
		</div>
	);
};

const NavbarDesktop: FC<NavbarProps> = ({ currentPage }): JSX.Element => {
	const [isScrolled, setIsScrolled] = useState<boolean>(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
	const [showChildren, setShowChildren] = useState<number>(-1);
	const [logo, setLogo] = useState<StaticImageData>(logoLight);
	const [textColor, setTextColor] = useState<string>(
		"text-white dark:text-gray-300",
	);
	const [isMobile, setIsMobile] = useState(false);
	const { theme } = useTheme();

	const bg =
		currentPage === "/" ? "bg-transparent" : "bg-white dark:bg-gray-800";

	const textColorHover =
		currentPage === "/"
			? `${textColor}`
			: `${textColor} hover:text-black dark:hover:text-white`;

	const underline =
		currentPage === "/"
			? "bg-white dark:bg-gray-300"
			: "bg-primary-base dark:bg-white";

	useEffect((): void => {
		if (currentPage === "/" && !isScrolled) {
			setTextColor("text-white dark:text-gray-300");
		} else {
			setTextColor("text-gray-700 dark:text-gray-300");
		}
	}, [currentPage, theme, isScrolled]);

	useEffect((): void => {
		if ((currentPage === "/" && !isScrolled) || theme === "dark") {
			setLogo(logoDark);
		} else {
			setLogo(logoLight);
		}
	}, [currentPage, theme, isScrolled]);

	useEffect((): (() => void) => {
		const handleScroll = () => {
			const offset = window.scrollY;
			if (offset > 60) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		// Initial check
		handleScroll();

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect((): (() => void) => {
		const handleScroll = () => {
			const offset = window.scrollY;
			if (offset > 60) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleMouseEnter = (index: number) => {
		if (!isMobile) {
			setShowChildren(index);
		}
	};

	const handleMouseLeave = () => {
		if (!isMobile) {
			setShowChildren(-1);
		}
	};

	const handleClick = (index: number) => {
		if (isMobile) {
			setShowChildren(showChildren === index ? -1 : index);
		}
	};

	return (
		<nav
			className={`${
				isScrolled ? "bg-white dark:bg-gray-800" : bg
			} fixed top-0 w-full z-20 py-4`}
		>
			<div className="container mx-auto flex justify-between items-center px-6 md:px-2">
				<div className="flex-shrink-0">
					<Link href="/">
						<Image
							src={logo}
							alt="Chodím inak"
							width={160}
							height={160}
							priority
							key={"logo"}
						/>
					</Link>
				</div>
				<button
					className="md:hidden"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				>
					<BarsIcon className={`h-6 w-6 ${textColor}`} />
				</button>

				<NavMobileOpen
					closeMenu={() => setIsMobileMenuOpen(false)}
					menuOpen={isMobileMenuOpen}
				/>

				<ul className="hidden text-sm lg:text-lg md:flex flex-grow justify-center items-center space-x-0">
					{NavItems.map((item, index) => (
						<>
							<li
								key={index}
								className={`relative group uppercase ${textColorHover} ${
									!item.children && "md:pr-4 lg:pr-8"
								}`}
							>
								<Link
									href={item.path}
									className={`${textColorHover} font-semibold relative z-10 transition-colors`}
									onClick={() => setShowChildren(-1)}
								>
									{item.name}

									<span className="absolute inset-x-0 -bottom-1 h-0.5 bg-secondary-base transform scale-x-0 group-hover:scale-x-100 transition-transform origin-top-left" />
									<span
										className={`absolute inset-x-0 -bottom-1 h-0.5 ${
											currentPage === item.path &&
											underline
										}  origin-top-left`}
									/>
								</Link>
							</li>
							{item.children && (
								<li
									className="md:pr-4 lg:pr-8 relative"
									onMouseLeave={handleMouseLeave}
								>
									<button
										onClick={() => handleClick(index)}
										onMouseEnter={() =>
											handleMouseEnter(index)
										}
									>
										<ChevronDown
											className={`${textColorHover} inline-block ml-1`}
										/>
									</button>
									<ul
										className={`bg-white dark:bg-gray-800 absolute top-full w-56 py-2 text-gray-700 dark:text-gray-300 transform transition-transform origin-top duration-300 ${
											showChildren === index
												? "scale-y-100"
												: "scale-y-0"
										}`}
									>
										{item.children.map((child, index) => (
											<li
												key={index}
												className="px-4 py-2 relative hover:text-black dark:hover:text-white uppercase text-sm"
											>
												<Link
													href={`${item.path}${child.path}`}
													className="relative z-10 transition-colors group"
												>
													<span className="inline-block relative overflow-hidden">
														{child.name}
														<span className="absolute left-0 bottom-0 h-0.5 w-0 bg-secondary-base group-hover:w-full transition-all ease-in-out duration-200"></span>
													</span>
												</Link>
											</li>
										))}
									</ul>
								</li>
							)}
						</>
					))}
				</ul>
				<div className="hidden md:flex items-center text-white mr-2 md:mr-0 uppercase text-xs">
					{/* TODO: add background */}
					<LanguageSwitch
						bg={isScrolled ? "bg-white dark:bg-gray-800" : bg}
						textColor={textColor}
					/>
					<div className="border-l h-5 mx-4" />
					<ModeSwitch />
				</div>
			</div>
		</nav>
	);
};

const Navbar: FC<NavbarProps> = ({ currentPage }): JSX.Element => {
	return (
		<>
			<NavbarDesktop currentPage={currentPage} />
		</>
	);
};

export default Navbar;
