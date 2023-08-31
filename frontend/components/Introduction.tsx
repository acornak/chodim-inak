"use client";
import React, { FC } from "react";
// Next
import Image from "next/image";
// Functions
import { useOnScreen } from "./shared/hooks";
// Images
import introductionImage from "@/public/home/introduction.jpg";

type IntroductionProps = {
	dict: {
		heading: string;
		paragraph1: string;
		paragraph2: string;
		paragraph3: string;
		paragraph4: string;
	};
};

const Introduction: FC<IntroductionProps> = ({ dict }): JSX.Element => {
	const options = { rootMargin: "-100px" };
	const [ref, visible] = useOnScreen(options);

	const imgAnimation = `absolute inset-0 transition-all duration-700 ease-in-out ${
		visible ? "translate-x-0 opacity-100" : "-translate-x-1/2 opacity-0"
	}`;

	const contentAnimation = `flex flex-col justify-center items-center text-center transform transition-all ease-in-out duration-700 ${
		visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
	}`;

	return (
		<>
			<h1
				className={`text-4xl mb-4 hidden md:block font-bold uppercase text-center pt-10 ${contentAnimation}`}
			>
				{dict.heading}
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 p-10" ref={ref}>
				<div className="relative h-[70vh]">
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
					<h1 className="text-4xl mb-4 md:hidden font-bold uppercase">
						{dict.heading}
					</h1>
					<p className="text-lg text-justify md:px-10 pb-6">
						{dict.paragraph1}
					</p>
					<p className="text-lg text-justify md:px-10 pb-6">
						{dict.paragraph2}
					</p>
					<p className="text-lg text-justify md:px-10 pb-6">
						{dict.paragraph3}
					</p>
					<p className="text-lg text-justify md:px-10">
						{dict.paragraph4}
					</p>
				</div>
			</div>
		</>
	);
};

export default Introduction;
