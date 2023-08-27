import { useEffect, useState } from "react";

export const useScroll = (threshold: number = 60): boolean => {
	const [isScrolled, setIsScrolled] = useState<boolean>(false);

	useEffect((): (() => void) => {
		setIsScrolled(window.scrollY > threshold);

		const handleScroll = () => {
			setIsScrolled(window.scrollY > threshold);
		};

		handleScroll();

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [threshold]);

	return isScrolled;
};
