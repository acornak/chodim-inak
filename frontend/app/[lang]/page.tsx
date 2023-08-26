import React from "react";
// Components
import { HeroHome } from "@/components/Hero";
import About from "@/components/About";
import ContentWrapper from "@/components/styled/ContentWrapper";

import { Locale } from "../../i18-config";
import { getDictionary } from "@/dictionaries";

export default async function Home({
	params: { lang },
}: {
	params: { lang: Locale };
}): Promise<JSX.Element> {
	const dict = await getDictionary(lang);

	return (
		<>
			<HeroHome dict={dict.home.hero} />
			<ContentWrapper>
				<About />
			</ContentWrapper>
			<ContentWrapper>
				<About />
			</ContentWrapper>
			<ContentWrapper>
				<About />
			</ContentWrapper>
			<ContentWrapper id="story">
				<About />
			</ContentWrapper>
			<ContentWrapper>
				<About />
			</ContentWrapper>
		</>
	);
}
