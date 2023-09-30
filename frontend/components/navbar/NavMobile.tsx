"use client";
import React, { FC, useEffect, useState } from "react";
// Next.j
import Link from "next/link";
import { usePathname } from "next/navigation";
// Components
import ModeSwitch from "../ModeSwitch";
import LanguageSwitch from "../LanguageSwitch";
// Functions
import { getLocaleFromPath } from "../shared/functions";
// Types and constants
import { NavItems } from "../shared/constants";
// Images and icons
import { ChevronDown } from "../icons/Chevrons";
import CloseIcon from "../icons/Close";
import FacebookIcon from "../icons/Facebook";
import TwitterIcon from "../icons/Twitter";
import LinkedInIcon from "../icons/LinkedIn";

type NavMobileOpenProps = {
	closeMenu: () => void;
	menuOpen: boolean;
};

const NavMobileOpen: FC<NavMobileOpenProps> = ({ closeMenu, menuOpen }) => {
	const pathname = usePathname();
	const locale: "sk" | "en" = getLocaleFromPath(pathname)!;
	const [showChildren, setShowChildren] = useState<number>(-1);
	const [rotateIndex, setRotateIndex] = useState<number | null>(null);

	const dict = {
		contact: {
			sk: "Kontakt",
			en: "Contact",
		},
		button: {
			sk: "Chcem asistovať!",
			en: "I want to help!",
		},
		phone: {
			sk: "Telefón",
			en: "Phone",
		},
	};

	const toggleChildren = (index: number) => {
		setRotateIndex((prevIndex) => (index === prevIndex ? null : index));
		setShowChildren(showChildren === index ? -1 : index);
	};

	const handleChildrenClose = () => {
		setShowChildren(-1);
		setRotateIndex(null);
		closeMenu();
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
			className="md:hidden fixed top-0 right-0 w-1/2 h-full bg-primary-bg dark:bg-gray-800 flex flex-col space-y-4 py-8 px-6 text-gray-700 dark:text-gray-300"
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
								href={`/${locale}${item.path}`}
								className="relative z-10 transition-colors group"
								onClick={handleChildrenClose}
							>
								<span className="inline-block relative overflow-hidden hover:text-black dark:hover:text-white">
									{item.name[locale!]}
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
												"transform 0.5s ease-in-out",
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
										href={`/${locale}${item.path}${child.path}`}
										className="relative z-10 transition-colors"
										onClick={handleChildrenClose}
									>
										<span className="inline-block relative overflow-hidden hover:text-black dark:hover:text-white text-xs">
											{child.name[locale]}
											<span className="absolute left-0 bottom-0 h-0.5 w-0 bg-secondary-base group-hover:w-full transition-all ease-in-out duration-200"></span>
										</span>
									</Link>
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
			<hr className="my-2" />
			<div className="flex text-gray-700 dark:text-gray-300 uppercase justify-between text-xs">
				<LanguageSwitch />
				<ModeSwitch />
			</div>

			<div className="fixed bottom-0 left-0 w-full p-4 bg-primary-bg dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm justify-center">
				<Link href="/calendar#register">
					<div className="flex justify-center">
						<button
							className="text-xs px-12 py-2 mb-4 rounded uppercase font-semibold border border-gray-300"
							onClick={closeMenu}
						>
							{dict.button[locale]}
						</button>
					</div>
				</Link>

				<hr className="my-2" />

				<div className="flex flex-col items-center">
					<span className="font-semibold text-center uppercase">
						{dict.contact[locale]}
					</span>
				</div>
				<div className="flex flex-col items-start">
					<span>
						<b>Email</b>:{" "}
						<a href="mailto:example@example.com">
							example@example.com
						</a>
					</span>
					<span>
						<b>{dict.phone[locale]}</b>:{" "}
						<a href="tel:00421901123456">00421 901 123 456</a>
					</span>
				</div>

				<div className="flex mt-4 space-x-4 justify-center items-center">
					<a
						href={process.env.NEXT_PUBLIC_FACEBOOK_URL}
						className="flex items-center"
						rel="noopener noreferrer"
						target="_blank"
					>
						<FacebookIcon />
					</a>
					<a href="#">
						<TwitterIcon />
					</a>
					<a href="#" className="mt-0">
						<LinkedInIcon />
					</a>
				</div>
			</div>
		</div>
	);
};

export default NavMobileOpen;
