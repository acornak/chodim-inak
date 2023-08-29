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
// Types and constants
import { IconProps, NavItem } from "./shared/types";
import { NavItems } from "./shared/constants";
import { usePathname } from "next/navigation";
import { getLocaleFromPath } from "./shared/functions";

const SocialLink: FC<{
	Icon: FC<IconProps>;
	name: string;
	href: string;
}> = ({ Icon, name, href }) => (
	<a href={href} className="flex items-center">
		<div className="w-5 flex-shrink-0">
			<Icon className="w-full" />
		</div>
		<span className="ml-2">{name}</span>
	</a>
);

type LinkListProps = {
	title: string;
	links: NavItem[];
	external?: boolean;
};

const LinkList: FC<LinkListProps> = ({ title, links, external }) => {
	const pathname = usePathname();
	const locale = getLocaleFromPath(pathname)!.toLowerCase();

	return (
		<div className="hidden md:block">
			<h4 className="font-semibold mb-2">{title}</h4>
			<ul>
				{links.map((link, index) => (
					<li key={index}>
						{external ? (
							<a
								href={link.path}
								target="_blank"
								rel="noopener noreferrer"
							>
								{link.name[locale]}
							</a>
						) : (
							<Link href={link.path}>{link.name[locale]}</Link>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

const Footer: FC = (): JSX.Element => {
	const { theme } = useTheme();
	const [logo, setLogo] = useState<StaticImageData>();

	useEffect((): void => {
		const newLogo: StaticImageData =
			theme === "dark" ? logoDark : logoLight;
		setLogo(newLogo);
	}, [theme]);

	const socialLinks = [
		{ Icon: FacebookIcon, name: "Facebook", href: "#" },
		{ Icon: TwitterIcon, name: "Twitter", href: "#" },
		{ Icon: LinkedInIcon, name: "LinkedIn", href: "#" },
	];

	const externalLinks: NavItem[] = [
		{
			name: {
				en: "OMD - personal Assistance",
				sk: "Osobná asistencia - OMD",
			},
			path: "https://www.osobnaasistencia.sk/",
		},
		{
			name: { sk: "ÚPSVaR", en: "Social buraeu" },
			path: "https://www.upsvr.gov.sk/",
		},
	];

	return (
		<footer className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-8">
			<hr className="my-4 mx-8" />
			<div className="container mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 px-6 md:px-0">
				<div className="text-xs">
					{logo && (
						<Image
							src={logo}
							alt="Logo"
							style={{ width: "90%", height: "auto" }}
							priority
							className="mb-6"
						/>
					)}
					<span>
						© {new Date().getFullYear()} Daniela Komanická
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
				<LinkList
					title="Mapa stránky"
					links={NavItems}
					external={false}
				/>
				<LinkList
					title="Mapa stránky"
					links={externalLinks}
					external={true}
				/>
				<div className="hidden md:block">
					<h4 className="font-semibold mb-2">Sociálne siete</h4>
					<ul>
						{socialLinks.map(({ Icon, name, href }, index) => (
							<li key={index}>
								<SocialLink
									Icon={Icon}
									name={name}
									href={href}
								/>
							</li>
						))}
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
