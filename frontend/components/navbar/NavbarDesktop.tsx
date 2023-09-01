import React, { FC, useCallback, useState } from "react";
// Next.js
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
// Components
import ModeSwitch from "../ModeSwitch";
import LanguageSwitch from "../LanguageSwitch";
// Images and icons
import BarsIcon from "../icons/Bars";
import { NavItem } from "../shared/types";
import { ChevronDown } from "../icons/Chevrons";

type LogoProps = {
	locale: string;
	logo: StaticImageData | undefined;
	biggerLogo?: boolean;
};

export const Logo: FC<LogoProps> = ({ locale, logo, biggerLogo }) =>
	logo && (
		<Link href={`/${locale}`}>
			<div
				style={{
					width: "290px",
					height: "60px",
					display: "flex",
					alignItems: "center",
				}}
				className="pl-0 md:pr-6 lg:pr-0"
			>
				<Image
					src={logo}
					alt="Chodím inak"
					width={biggerLogo ? 290 : 180}
					height={biggerLogo ? 290 : 180}
					priority
					key={"logo"}
				/>
			</div>
		</Link>
	);

type MobileMenuButtonProps = {
	setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
	textColor: string | undefined;
};

export const MobileMenuButton: FC<MobileMenuButtonProps> = ({
	setIsMobileMenuOpen,
	textColor,
}) => (
	<button
		className="md:hidden"
		onClick={() => setIsMobileMenuOpen((prev) => !prev)}
	>
		<BarsIcon className={`h-6 w-6 ${textColor}`} />
	</button>
);

type OtherControlsProps = {
	isScrolled: boolean;
	bg: string;
	textColor: string | undefined;
};

export const OtherControls: FC<OtherControlsProps> = ({
	isScrolled,
	bg,
	textColor,
}) => (
	<div className="hidden md:flex items-center text-white mr-2 md:mr-0 uppercase text-xs">
		<LanguageSwitch
			bg={isScrolled ? "bg-white dark:bg-gray-800" : bg}
			textColor={textColor}
		/>
		<div className="border-l h-5 mx-4" />
		<ModeSwitch />
	</div>
);

type MenuItemProps = {
	index: number;
	item: NavItem;
	locale: string;
	textColorHover: string;
	currentPage: string;
	underline: string;
	isMobile: boolean;
};

export const MenuItem: FC<MenuItemProps> = ({
	index,
	item,
	locale,
	textColorHover,
	currentPage,
	underline,
	isMobile,
}) => {
	const [showChildren, setShowChildren] = useState<number>(-1);

	const handleMouseEnter = useCallback(
		(index: number): void => {
			if (!isMobile) setShowChildren(index);
		},
		[isMobile],
	);

	const handleMouseLeave = useCallback((): void => {
		if (!isMobile) setShowChildren(-1);
	}, [isMobile]);

	const handleClick = useCallback(
		(index: number): void => {
			if (isMobile) setShowChildren(showChildren === index ? -1 : index);
		},
		[isMobile, showChildren],
	);

	const showUnderline = () => {
		return (
			(currentPage === `/${locale}${item.path}` ||
				(currentPage === `/${locale}` && item.path === "/")) &&
			underline
		);
	};

	return (
		<>
			<li
				className={`relative group uppercase ${textColorHover} ${
					!item.children && "md:pr-4 lg:pr-8"
				}`}
			>
				<Link
					href={`/${locale}${item.path}`}
					className={`${textColorHover} font-semibold relative z-10 transition-colors`}
					onClick={() => setShowChildren(-1)}
				>
					{item.name[locale]}
					<span className="absolute inset-x-0 -bottom-1 h-0.5 bg-secondary-base transform scale-x-0 group-hover:scale-x-100 transition-transform origin-top-left" />
					<span
						className={`absolute inset-x-0 -bottom-1 h-0.5 ${showUnderline()}  origin-top-left`}
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
						onMouseEnter={() => handleMouseEnter(index)}
					>
						<ChevronDown
							className={`${textColorHover} inline-block ml-1`}
						/>
					</button>
					<ChildItems
						item={item}
						locale={locale}
						setShowChildren={setShowChildren}
						showChildren={showChildren}
						index={index}
					/>
				</li>
			)}
		</>
	);
};

type ChildItemsProps = {
	item: NavItem;
	locale: string;
	setShowChildren: React.Dispatch<React.SetStateAction<number>>;
	showChildren: number;
	index: number;
};

const ChildItems: FC<ChildItemsProps> = ({
	item,
	locale,
	setShowChildren,
	showChildren,
	index,
}) => (
	<ul
		className={`bg-white dark:bg-gray-800 absolute top-full w-56 py-2 text-gray-700 dark:text-gray-300 transform transition-transform origin-top duration-300 ${
			showChildren === index ? "scale-y-100" : "scale-y-0"
		}`}
	>
		{item.children!.map((child, index) => (
			<li
				key={index}
				className="px-4 py-2 relative hover:text-black dark:hover:text-white uppercase text-sm"
			>
				<Link
					href={`/${locale}${item.path}${child.path}`}
					className="relative z-10 transition-colors group"
					onClick={() => setShowChildren(-1)}
				>
					<span className="inline-block relative overflow-hidden">
						{child.name[locale]}
						<span className="absolute left-0 bottom-0 h-0.5 w-0 bg-secondary-base group-hover:w-full transition-all ease-in-out duration-200"></span>
					</span>
				</Link>
			</li>
		))}
	</ul>
);
