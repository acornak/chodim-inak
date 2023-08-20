import React, { FC } from "react";
// Next.js
import Image from "next/image";
import Link from "next/link";
// Components
import { CTAButton } from "./styled/Button";
// Types and constants
import { NavItems } from "./shared/constants";
// Images
import logo from "@/public/logo.png";

type NavbarProps = {
	currentPage: string;
};

const Navbar: FC<NavbarProps> = ({ currentPage }): JSX.Element => {
	return (
		<nav className="bg-white sticky top-0 z-50 py-4 shadow-md">
			<div className="container mx-auto flex justify-between items-center">
				<div>
					<Link href="/">
						<Image
							src={logo}
							alt="Chodím inak"
							width={160}
							height={160}
							priority
							className="ml-4"
						/>
					</Link>
				</div>
				<ul className="hidden md:flex space-x-6">
					{NavItems.map((item, index) => (
						<li key={index} className="relative group uppercase">
							<Link
								href={item.path}
								className="text-gray-700 hover:text-black relative z-10 transition-colors"
							>
								{item.name}
								<span className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary-base transform scale-x-0 group-hover:scale-x-100 transition-transform origin-top-left" />
								<span
									className={`absolute inset-x-0 bottom-0 h-0.5 ${
										currentPage === item.path &&
										"bg-primary-base"
									}  origin-top-left`}
								/>
							</Link>
						</li>
					))}
				</ul>

				<div>
					<CTAButton>Chcem asistovať!</CTAButton>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
