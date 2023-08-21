import React, { FC } from "react";
// Next
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
// Components
import { CTAButton } from "./styled/Button";
// Image
import heroImage from "@/public/hero.jpeg";

const HeroHome: FC = (): JSX.Element => {
	return (
		<div className="relative h-screen flex items-center justify-center">
			<Image
				src={heroImage}
				fill
				priority
				alt="Chodím inak a vítam vás vo svete osobnej asistencie."
				className="z-0"
				style={{ objectFit: "cover" }}
			/>

			<div className="z-10 relative text-center">
				<h1 className="text-4xl font-bold mb-4">Chodím inak</h1>
				<p className="mb-4">a vítam vás vo svete osobnej asistencie.</p>
				<CTAButton>Chcem asistovať!</CTAButton>
			</div>
		</div>
	);
};

type HeroProps = {
	image: StaticImport;
	title: string;
	subtitle: string;
	action?: JSX.Element;
};

const HeroOthers: FC<HeroProps> = ({
	image,
	title,
	subtitle,
	action,
}): JSX.Element => {
	return (
		<div className="relative h-72 flex items-center justify-center">
			<Image
				src={image}
				fill
				priority
				alt="Chodím inak a vítam vás vo svete osobnej asistencie."
				className="z-0"
				style={{ objectFit: "cover" }}
			/>

			<div className="z-10 relative text-center">
				<h1 className="text-4xl font-bold mb-4">{title}</h1>
				<p className="mb-4">{subtitle}</p>
				{action}
			</div>
		</div>
	);
};

export { HeroHome, HeroOthers };
