"use client";
import React, { FC, useEffect, useState } from "react";
// Next
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
// Image
import heroalt2 from "@/public/home/home-hero.webp";
import Link from "next/link";

type HeroHomeProps = {
	dict: {
		heading: string;
		subheading: string;
		button: string;
	};
};

const HeroHome: FC<HeroHomeProps> = ({ dict }): JSX.Element => {
	const [loaded, setLoaded] = useState<boolean>(false);

	useEffect((): void => {
		setLoaded(true);
	}, []);

	const commonClasses = `transform transition-all ease-in-out duration-700 ${
		loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
	}`;

	return (
		<div className="relative h-[100vh] flex items-center justify-center text-white dark:text-gray-300">
			<Image
				src={heroalt2}
				fill
				priority
				alt="Chodím inak a vítam vás vo svete osobnej asistencie."
				style={{ objectFit: "cover", objectPosition: "60%" }}
			/>

			<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70" />
			<div className="absolute inset-0 dark:bg-black dark:opacity-30" />
			<div className="absolute z-10 md:ml-[40%] lg:ml-[60%] mt-[30%] md:mt-0 md:mb-[10%] w-full text-center md:text-left">
				<h1
					className={`${commonClasses} text-4xl font-bold mb-4 md:mb-8 uppercase`}
					style={{
						transitionDelay: "100ms",
					}}
				>
					{dict.heading}
				</h1>
				<p
					className={`${commonClasses} text-lg mb-4 md:mb-8`}
					style={{ transitionDelay: "300ms" }}
				>
					{dict.subheading}
				</p>
				<Link href="/calendar#register">
					<button
						className={`homepage-button bg-transparent px-6 py-2 rounded uppercase border font-semibold transform hover:bg-white hover:text-gray-800 ${
							loaded
								? "loaded-homepage-button translate-y-0 opacity-100"
								: "translate-y-8 opacity-0"
						} `}
					>
						{dict.button}
					</button>
				</Link>
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
		<div className="relative h-[70vh] flex items-center justify-center text-white dark:text-gray-300">
			<Image
				src={image}
				fill
				priority
				alt="Chodím inak a vítam vás vo svete osobnej asistencie."
				className="z-0"
				style={{ objectFit: "cover", objectPosition: "60%" }}
			/>
			<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70" />
			<div className="absolute inset-0 dark:bg-black dark:opacity-50" />
			<div className="z-10 relative text-center">
				<h1 className="text-4xl font-bold mb-4">{title}</h1>
				<p className="mb-4 text-2xl">{subtitle}</p>
				{action}
			</div>
		</div>
	);
};

export { HeroHome, HeroOthers };
