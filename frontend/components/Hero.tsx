"use client";
import React, { FC, useEffect, useState } from "react";
// Next
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
// Image
import heroImage from "@/public/hero.png";

const HeroHome: FC = (): JSX.Element => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
	}, []);

	return (
		<div className="relative h-[90vh] flex items-center justify-center z-10 text-white dark:text-gray-300">
			<Image
				src={heroImage}
				layout="fill"
				priority
				alt="Chodím inak a vítam vás vo svete osobnej asistencie."
				style={{ objectFit: "cover" }}
			/>
			<div className="absolute z-10 text-left md:pb-48 md:pl-32 lg:pl-56 xl:pl-72 w-full text-center md:text-left">
				<h1
					style={{ transitionDelay: "100ms" }}
					className={`text-4xl font-bold mb-4 md:mb-8 uppercase transform transition-all ease-in-out duration-700 ${
						loaded
							? "translate-y-0 opacity-100"
							: "translate-y-8 opacity-0"
					}`}
				>
					Chodím inak...
				</h1>
				<p
					style={{ transitionDelay: "300ms" }}
					className={`mb-4 md:mb-8 text-lg transform transition-all ease-in-out duration-700 ${
						loaded
							? "translate-y-0 opacity-100"
							: "translate-y-8 opacity-0"
					}`}
				>
					...a vítam vás vo svete osobnej asistencie.
				</p>
				<button
					className={`homepage-button bg-transparent px-6 py-2 rounded uppercase border font-semibold transform ${
						loaded
							? "loaded-homepage-button translate-y-0 opacity-100"
							: "translate-y-8 opacity-0"
					} hover:bg-white hover:text-gray-800`}
				>
					Chcem asistovať!
				</button>
			</div>
		</div>
	);
};

type HeroProps = {
	image: StaticImport;
	title: string;
	subtitle: string;
	action?: JSX.Element;
};

const HeroOthers: FC<HeroProps> = ({
	image,
	title,
	subtitle,
	action,
}): JSX.Element => {
	return (
		<div className="relative h-72 flex items-center justify-center">
			<Image
				src={image}
				fill
				priority
				alt="Chodím inak a vítam vás vo svete osobnej asistencie."
				className="z-0"
				style={{ objectFit: "cover" }}
			/>

			<div className="z-10 relative text-center">
				<h1 className="text-4xl font-bold mb-4">{title}</h1>
				<p className="mb-4">{subtitle}</p>
				{action}
			</div>
		</div>
	);
};

export { HeroHome, HeroOthers };
