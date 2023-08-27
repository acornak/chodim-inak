"use client";
import React, { FC } from "react";
// Next
import Image from "next/image";
// Functions
import { useOnScreen } from "./shared/hooks";
// Images
import introductionImage from "@/public/home/introduction.jpg";

const Introduction: FC = (): JSX.Element => {
	const options = { rootMargin: "-100px" };
	const [ref, visible] = useOnScreen(options);

	const imgAnimation = `absolute inset-0 transition-all duration-700 ease-in-out ${
		visible ? "translate-x-0 opacity-100" : "-translate-x-1/2 opacity-0"
	}`;

	const contentAnimation = `flex flex-col justify-center items-center text-center transform transition-all ease-in-out duration-700 ${
		visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
	}`;

	return (
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
			<div className={contentAnimation}>
				<h1 className="text-4xl mb-4">Heading</h1>
				<p>Your text here.</p>
			</div>
		</div>
	);
};

export default Introduction;
