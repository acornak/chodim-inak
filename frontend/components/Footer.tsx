"use client";
// React
import React, { FC, useEffect, useState } from "react";
// Next
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
// Images and icons
import logoLight from "@/public/logo-light.png";
import logoDark from "@/public/logo-dark.png";
import FacebookIcon from "./icons/Facebook";
import TwitterIcon from "./icons/Twitter";
import LinkedInIcon from "./icons/LinkedIn";

const Footer: FC = (): JSX.Element => {
	const [logo, setLogo] = useState<StaticImageData>(logoLight);
	const { theme } = useTheme();

	useEffect((): void => {
		if (theme === "dark") {
			setLogo(logoDark);
		} else {
			setLogo(logoLight);
		}
	}, [theme]);

	return (
		<footer className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-8">
			<hr className="my-4 mx-8" />
			<div className="container mx-auto md:px-0 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 px-6 md:px-0">
				<div className="text-xs">
					<Image
						src={logo}
						alt="Chodím inak"
						width={0}
						height={0}
						sizes="100vw"
						style={{ width: "90%", height: "auto" }}
						priority
						key={"logo"}
						className="mb-6"
					/>
					<span>
						© {new Date().getFullYear()} Daniela Komanická.
						<p>
							<b>Web</b>:
							<Link
								href="https://www.antoncornak.com/"
								className="inline-block ml-1"
							>
								@antoncornak
							</Link>
						</p>
						<p>
							<b>Logo</b>:
							<Link
								href="http://matejlacko.com/"
								className="inline-block ml-1"
							>
								@matejlacko
							</Link>
						</p>
					</span>
				</div>

				<div className="hidden lg:block">
					<h4 className="font-semibold mb-2">Mapa stránky</h4>
					<ul>
						<li>Home</li>
						<li>About</li>
						<li>Services</li>
					</ul>
				</div>

				<div className="hidden md:block">
					<h4 className="font-semibold mb-2">Zaujímavé linky</h4>
					<ul>
						<li>FAQ</li>
						<li>Contact</li>
						<li>Blog</li>
					</ul>
				</div>

				<div className="hidden md:block">
					<h4 className="font-semibold mb-2">Sociálne siete</h4>
					<ul>
						<li>
							<a href="#" className="flex items-center">
								<div className="w-5 flex-shrink-0">
									<FacebookIcon className="w-full" />
								</div>
								<span className="ml-2">Facebook</span>
							</a>
						</li>
						<li>
							<a href="#" className="flex items-center">
								<div className="w-5 flex-shrink-0">
									<TwitterIcon className="w-full" />
								</div>
								<span className="ml-2">Twitter</span>
							</a>
						</li>
						<li>
							<a href="#" className="flex items-center">
								<div className="w-5 flex-shrink-0">
									<LinkedInIcon className="w-full" />
								</div>
								<span className="ml-2">LinkedIn</span>
							</a>
						</li>
					</ul>
				</div>

				<div>
					<h4 className="font-semibold mb-2">Kontakt</h4>
					<p className="text-sm">
						<b>Email</b>:{" "}
						<a href="mailto:example@example.com">
							example@example.com
						</a>
					</p>
					<p className="text-sm">
						<b>Telefón</b>:{" "}
						<a href="tel:00421901123456">00421 901 123 456</a>
					</p>
					<div className="flex justify-center mt-4">
						<button className="text-xs px-10 md:px-4 lg:px-6 xl:px-12 py-2 mb-4 rounded uppercase font-semibold border border-gray-300">
							Chcem asistovať!
						</button>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
