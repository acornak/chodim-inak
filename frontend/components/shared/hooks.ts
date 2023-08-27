"use client";
import { useEffect, useState, useRef, RefObject } from "react";

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

interface Options {
	root?: Element | null;
	rootMargin?: string;
	threshold?: number | number[];
}

export const useOnScreen = (
	options: Options,
): [RefObject<HTMLDivElement>, boolean] => {
	const ref = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect((): (() => void) => {
		const currentRef = ref.current;

		const observer = new IntersectionObserver(([entry]) => {
			setVisible(entry.isIntersecting);
		}, options);

		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, [ref, options]);

	return [ref, visible];
};
