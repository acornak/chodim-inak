"use client";
import React, { FC, useState } from "react";
// Images and icons
import { ChevronDown } from "./icons/Chevrons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n } from "@/i18-config";
import { getLocaleFromPath } from "./shared/functions";

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
		<div className={`${textColor} relative`}>
			<button onClick={toggleDropdown} className="text-sm mr-2 uppercase">
				{locale?.toUpperCase()}
				<ChevronDown className={`inline-block`} />
			</button>
			{showDropdown && (
				<ul
					className={`${bg} absolute top-full -left-4 w-full py-2 mt-1`}
				>
					{i18n.locales.map((locale) => (
						<li key={locale} className="px-4 py-2 cursor-pointer">
							<Link
								locale={locale}
								href={redirectedPathName(locale)}
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
