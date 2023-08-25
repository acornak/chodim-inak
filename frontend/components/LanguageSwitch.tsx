"use client";
import React, { FC, useState } from "react";
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
	const languages = [
		{ code: "en", name: "EN" },
		{ code: "sk", name: "SK" },
	];

	const [showDropdown, setShowDropdown] = useState(false);
	const [selectedLanguage, setSelectedLanguage] = useState(languages[0].name);

	const toggleDropdown = () => setShowDropdown(!showDropdown);

	const selectLanguage = (language: string) => {
		setSelectedLanguage(language);
		setShowDropdown(false);
	};

	return (
		<div className={`${textColor} relative`}>
			<button onClick={toggleDropdown} className="text-sm mr-2 uppercase">
				{selectedLanguage} <ChevronDown className={`inline-block`} />
			</button>
			{showDropdown && (
				<ul
					className={`${bg} absolute top-full -left-4 w-full py-2 mt-1`}
				>
					{languages.map((language, index) => (
						<li
							key={index}
							className="px-4 py-2 cursor-pointer"
							onClick={() => selectLanguage(language.name)}
						>
							{language.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default LanguageSwitch;
