"use client";
import React, { FC, useState } from "react";
// Next
import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n } from "@/i18-config";
// Functions
import { getLocaleFromPath } from "./shared/functions";
// Images and icons
import { ChevronDown } from "./icons/Chevrons";

type LanguageSwitchProps = {
	textColor?: string;
	bg?: string;
};

const LanguageSwitch: FC<LanguageSwitchProps> = ({
	textColor,
	bg,
}): JSX.Element => {
	const pathName = usePathname();
	const locale = getLocaleFromPath(pathName);

	const redirectedPathName = (locale: string) => {
		const segments = pathName.split("/");
		segments[1] = locale;
		return segments.join("/");
	};

	const [showDropdown, setShowDropdown] = useState(false);

	const toggleDropdown = () => setShowDropdown(!showDropdown);

	return (
		<div
			className={`${textColor} relative`}
			onMouseEnter={() => setShowDropdown(true)}
		>
			<button onClick={toggleDropdown} className="text-sm mr-2 uppercase">
				{locale?.toUpperCase()}
				<ChevronDown className={`inline-block`} />
			</button>
			{showDropdown && (
				<ul
					className={`${bg} absolute top-full -left-4 w-full py-2 mt-1`}
					onMouseLeave={() => setShowDropdown(false)}
				>
					{i18n.locales.map((locale) => (
						<li key={locale} className="px-4 py-2 cursor-pointer">
							<Link
								locale={locale}
								href={redirectedPathName(locale)}
								onClick={() => setShowDropdown(false)}
							>
								{locale}
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default LanguageSwitch;
