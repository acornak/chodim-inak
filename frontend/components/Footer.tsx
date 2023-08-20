import Link from "next/link";
import React, { FC } from "react";

const Footer: FC = (): JSX.Element => {
	return (
		<footer className="bg-primary-base text-white text-center py-4 text-sm">
			© {new Date().getFullYear()} Daniela Komanická. Všetky práva
			vyhradené.
			<div className="mt-2 text-xs">
				Webdizajn:
				<Link
					href="https://www.antoncornak.com/"
					className="inline-block ml-1"
				>
					@antoncornak
				</Link>
			</div>
			<div className="mb-2 text-xs">
				Logo:
				<Link
					href="http://matejlacko.com/"
					className="inline-block ml-1"
				>
					@matejlacko
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
