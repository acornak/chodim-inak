"use client";
import { useEffect, useState, useRef, RefObject } from "react";
import { useRouter } from "next/navigation";

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

export const useScrollToChangeURL = (
	ref: React.RefObject<HTMLDivElement>,
	anchor: string,
) => {
	const router = useRouter();

	useEffect(() => {
		const handleScroll = () => {
			const rect = ref.current!.getBoundingClientRect();
			if (rect.top <= 0 && rect.bottom >= 0) {
				router.replace(`#${anchor}`, { scroll: false });
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [ref, anchor, router]);
};
