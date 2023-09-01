import React from "react";
// Components
import { HeroOthers } from "@/components/Hero";
// Internationalization
import { Locale } from "@/i18-config";
import { getDictionary } from "@/dictionaries";
// Image
import heroBlog from "@/public/blog/hero-blog.png";

export default async function Blog({
	params: { lang },
}: {
	params: { lang: Locale };
}): Promise<JSX.Element> {
	const dict = (await getDictionary(lang)).blog;

	return (
		<>
			<HeroOthers
				title={dict.hero.heading}
				subtitle={dict.hero.subheading}
				image={heroBlog}
			/>
			<div className="text-center pt-10 px-4 text-2xl font-semibold dark:text-gray-300">
				<p className="mx-auto">{dict.placeholder}</p>
			</div>
		</>
	);
}
