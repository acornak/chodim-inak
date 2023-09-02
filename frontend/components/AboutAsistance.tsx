"use client";
import React, { FC, useEffect, useRef } from "react";
// Functions
import { useOnScreen } from "./shared/hooks";
// Images
import "./cards.css";

type Card = {
	heading: string;
	text: string[];
};

type AboutAsistanceProps = {
	dict: {
		heading: string;
		cards: Card[];
	};
};

const AboutAsistance: FC<AboutAsistanceProps> = ({ dict }): JSX.Element => {
	const cardsRef = useRef<HTMLDivElement>(null);
	const [ref, visible] = useOnScreen({
		rootMargin: "2500px 0px 0px 0px",
		threshold: 0,
	});

	useEffect((): void => {
		const cardNodes = Array.from(
			cardsRef.current?.childNodes ?? [],
		) as HTMLElement[];

		if (visible) {
			cardNodes.forEach((card, index) => {
				setTimeout(() => {
					card.style.transform = "translateX(0)";
				}, index * 200);
			});
		} else {
			cardNodes.forEach((card) => {
				card.style.transform = "translateX(100vw)";
			});
		}
	}, [visible]);

	const contentAnimation = `flex flex-col justify-center items-center text-center transform transition-all ease-in-out duration-700 ${
		visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
	}`;

	return (
		<section id="assistance">
			<h1
				className={`text-4xl mb-4 font-bold uppercase text-center pt-10 ${contentAnimation}`}
				ref={ref}
			>
				{dict.heading}
			</h1>
			<div
				ref={cardsRef}
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
			>
				{dict.cards.map((card) => (
					<div
						className="p-4 slide-card transform transition-all duration-1000 ease-in-out translate-x-[310%]"
						key={card.heading}
					>
						<div className="flip-card rounded-lg overflow-hidden h-[420px]">
							<div className="flip-card-inner h-full">
								<div className="flip-card-front flex items-center justify-center h-full bg-gray-100 dark:bg-gray-600 rounded-lg">
									<h2 className="text-2xl font-bold">
										{card.heading}
									</h2>
								</div>
								<div className="flip-card-back flex items-center justify-center h-full bg-gray-200 dark:bg-gray-900 rounded-lg">
									<div className="p-6">
										<h3 className="text-lg text-center font-semibold pb-4">
											{card.heading}
										</h3>
										{card.text.map((text) => (
											<p
												className="text-xs text-justify p-1"
												key={text.slice(0, 10)}
											>
												{text}
											</p>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default AboutAsistance;
