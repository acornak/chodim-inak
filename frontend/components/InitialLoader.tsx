"use client";
import React, { FC } from "react";
// Misc
import CountUp from "react-countup";
// Context
import AnimatedProgressProvider from "./context/AnimatedProgressProvider";

const InitialLoader: FC = (): JSX.Element => {
	return (
		<div className="fixed inset-0 bg-primary-base flex flex-col justify-center items-center">
			<div className="text-white text-xl font-bold mb-4">
				Daniela Komanická | Chodím inak
			</div>
			<div className="w-1/3 mx-auto flex items-center relative">
				<div className="w-full h-1 bg-primary-dark rounded-full">
					<AnimatedProgressProvider
						valueStart={0}
						valueEnd={100}
						delay={0}
						duration={0.8}
					>
						{(value) => (
							<div
								className="h-full bg-secondary-base rounded-full"
								style={{ width: `${value}%` }}
							/>
						)}
					</AnimatedProgressProvider>
				</div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pt-10 text-white">
					<CountUp
						start={0}
						end={100}
						duration={0.8}
						suffix=" %"
						className="text-md text-white"
					/>
				</div>
			</div>
		</div>
	);
};

export default InitialLoader;
