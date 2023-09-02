"use client";
import React, { FC } from "react";
// Next
import Image from "next/image";
// Functions
import { useOnScreen } from "./shared/hooks";
// Images
import introductionImage from "@/public/home/introduction.webp";

type AboutMeProps = {
	dict: {
		heading: string;
		paragraph1: string;
		paragraph2: string;
		paragraph3: string;
	};
};

const AboutMe: FC<AboutMeProps> = ({ dict }): JSX.Element => {
	const options = { rootMargin: "-100px" };
	const [ref, visible] = useOnScreen(options);

	const imgAnimation = `absolute inset-0 transition-all duration-700 ease-in-out ${
		visible ? "translate-x-0 opacity-100" : "-translate-x-1/2 opacity-0"
	}`;

	const contentAnimation = `flex flex-col justify-center items-center text-center transform transition-all ease-in-out duration-700 ${
		visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
	}`;

	return (
		<section id="me">
			<h1
				className={`text-4xl mb-4 font-bold uppercase text-center pt-10 ${contentAnimation}`}
			>
				{dict.heading}
			</h1>
			<p className={`text-lg text-justify px-10 ${contentAnimation}`}>
				{dict.paragraph1}
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 p-10" ref={ref}>
				<div className="relative h-[70vh] md:self-center">
					<div className="absolute inset-0 mb-10 md:mb-0">
						<Image
							src={introductionImage}
							alt="Introduction"
							priority
							fill
							style={{
								objectFit: "cover",
								objectPosition: "center",
							}}
							className={imgAnimation}
						/>
					</div>
				</div>
				<div className={`${contentAnimation}`}>
					<p className="text-md text-justify md:px-10 pb-6">
						{dict.paragraph2}
					</p>
					<p className="md:hidden lg:block text-md text-justify md:px-10 pb-6">
						{dict.paragraph3}
					</p>
				</div>
			</div>
			<p className="hidden md:block lg:hidden text-md text-justify md:px-10 pb-6">
				{dict.paragraph3}
			</p>
		</section>
	);
};

export default AboutMe;
