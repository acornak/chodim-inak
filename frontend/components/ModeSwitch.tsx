// React
import React, { FC, useEffect, useState } from "react";
// Context
import { useTheme } from "next-themes";
import { DarkMode, LightMode } from "./icons/ModeIcons";

const ModeSwitch: FC = (): JSX.Element => {
	const [mounted, setMounted] = useState<boolean>(false);
	const { theme, setTheme } = useTheme();

	useEffect((): void => setMounted(true), []);

	if (!mounted) return <></>;

	return (
		<>
			<div className="relative inline-block w-14 h-7 align-middle select-none transition duration-200 ease-in">
				<input
					type="checkbox"
					name="dark-mode-toggle"
					id="dark-mode-toggle"
					className="dark-mode-checkbox absolute w-7 h-7 rounded-md bg-white border-2 border-primary-light appearance-none cursor-pointer"
					onChange={() =>
						setTheme(theme === "dark" ? "light" : "dark")
					}
					checked={theme === "dark"}
				/>
				<label
					htmlFor="dark-mode-toggle"
					className="dark-mode-label block text-gray-300 overflow-hidden rounded-md h-7 bg-primary-light cursor-pointer transition-colors duration-200 ease-in flex justify-center items-center"
				>
					{theme === "dark" ? (
						<DarkMode className="transition-opacity duration-300 ease-in opacity-100 mr-6 mt-1" />
					) : (
						<LightMode className="transition-opacity duration-300 ease-in opacity-100 ml-6 mt-1" />
					)}
				</label>
			</div>
		</>
	);
};

export default ModeSwitch;
