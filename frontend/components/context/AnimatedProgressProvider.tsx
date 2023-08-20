"use client";
import React, { useEffect, useState } from "react";

type AnimatedProgressProviderProps = {
	valueStart: number;
	valueEnd: number;
	children: (value: number) => React.ReactNode;
	delay?: number;
	duration?: number;
};

const AnimatedProgressProvider = ({
	valueStart,
	valueEnd,
	children,
	delay = 1200,
	duration = 1,
}: AnimatedProgressProviderProps) => {
	const [value, setValue] = useState(valueStart);

	useEffect(() => {
		const timeout = setTimeout(() => {
			const interval = setInterval(() => {
				setValue((oldValue: number) => {
					if (oldValue < valueEnd) {
						return oldValue + 1;
					}
					clearInterval(interval);
					return oldValue;
				});
			}, 10 * duration);

			return () => {
				clearInterval(interval);
			};
		}, delay);

		return () => {
			clearTimeout(timeout);
		};
	}, [valueEnd, delay, duration]);

	return children(value);
};

export default AnimatedProgressProvider;
