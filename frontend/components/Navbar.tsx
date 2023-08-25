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

type NavbarProps = {
	currentPage: string;
};

const Navbar: FC<NavbarProps> = ({ currentPage }): JSX.Element => {
	const [showChildren, setShowChildren] = useState<number>(-1);
	const [isMobile, setIsMobile] = useState(false);
	const { theme } = useTheme();

	const bg =
		currentPage === "/" ? "bg-transparent" : "bg-white dark:bg-gray-800";
	const textColorHover =
		currentPage === "/"
			? "text-white dark:text-gray-300"
			: "text-gray-700  dark:text-gray-300 hover:text-black dark:hover:text-white";

	const textColor =
		currentPage === "/"
			? "text-white dark:text-gray-300"
			: "text-gray-700  dark:text-gray-300";

	const underline =
		currentPage === "/"
			? "bg-white dark:bg-gray-300"
			: "bg-primary-base dark:bg-white";

	const handleLogo = (): StaticImageData => {
		if (currentPage === "/") {
			return logoDark;
		} else if (theme === "dark") {
			return logoDark;
		} else {
			return logoLight;
		}
	};

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
		<nav className={`${bg} absolute top-0 w-full z-20 py-4`}>
			<div className="container mx-auto flex justify-between items-center">
				<div className="flex-shrink-0">
					<Link href="/">
						<Image
							src={handleLogo()}
							alt="Chodím inak"
							width={160}
							height={160}
							priority
						/>
					</Link>
				</div>
				<ul className="hidden text-sm lg:text-lg md:flex flex-grow justify-center items-center space-x-0">
					{NavItems.map((item, index) => (
						<>
							<li
								key={index}
								className={`relative group uppercase ${
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
													{child.name}
													{/* <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-secondary-base transform scale-x-0 group-hover:scale-x-100 transition-transform origin-top-left" /> */}
												</Link>
											</li>
										))}
									</ul>
								</li>
							)}
						</>
					))}
				</ul>

				<div className="flex items-center text-white mr-2 md:mr-0 uppercase text-xs">
					<LanguageSwitch bg={bg} textColor={textColor} />
					<div className="border-l h-5 mx-4" />
					<ModeSwitch />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
